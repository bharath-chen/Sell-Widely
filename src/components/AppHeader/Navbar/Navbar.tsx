import React, { FC, useState } from "react";
import MenuBar from "../../../shared/MenuBar/MenuBar";
import AvatarDropdown from "./AvatarDropdown";
import Navigation from "../../../shared/Navigation/Navigation";
import CartDropdown from "./CartDropdown";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate } from "react-router-dom";
import sellWidelyLogo from "../../../assets/images/logo.png";
import productsSearch from "../../../services/products-search";
import { Product } from "../../../models/product";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { hideLoader, showLoader } from "../../../features/loader/loaderSlice";
import { selectIsLoggedIn } from "../../../features/auth/authSlice";
import searchSuggestionService from "../../../services/search-suggestion-service";
import recentSearchService from "../../../services/recent-search-service";
import { RootState } from "../../../state/store";
import { useSelector } from "react-redux";

export interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const inputRef = React.createRef<HTMLInputElement>();
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<
    { product_name: string }[]
  >([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]); // State for recent searches
  const [searchTerm, setSearchTerm] = useState(""); // Store the current search term
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const customer = useAppSelector((state: RootState) => state.auth);

  const renderMagnifyingGlassIcon = () => {
    return (
      <svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 22L20 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputRef.current?.value) return;

    const { request } = productsSearch.getAll<
      Product,
      { ["item_search_text"]: string }
    >({
      ["item_search_text"]: inputRef.current.value || "",
    });

    dispatch(showLoader());

    request
      .then((res) => {
        dispatch(hideLoader());
        navigate("/page-search", {
          state: {
            products: res.data,
            searchText: inputRef.current?.value,
          },
        });
      })
      .catch((err) => {
        dispatch(hideLoader());
      });
  };

  const getSearchSuggestion = (e: React.ChangeEvent) => {
    const query = (e.target as HTMLInputElement).value;

    setSearchTerm(query); // Update the search term state
    if (query) {
      const { request } = searchSuggestionService.getAll<
        { product_name: string },
        { item_search_text: string }
      >({
        item_search_text: query,
      });

      request
        .then((res) => {
          setSearchSuggestions(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSearchSuggestions([]); // Clear suggestions when input is empty
    }
  };

  const getRecentSearch = () => {
    if (customer.customer_id) {
      const { request } = recentSearchService.getAll<
        string,
        { customer_id: string }
      >({
        customer_id: customer.customer_id,
      });

      request
        .then((res) => {
          setRecentSearches(res.data); // Update recent searches state
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    inputRef.current!.value = suggestion;
    setSearchSuggestions([]);
    handleSearch(new Event("submit") as unknown as React.FormEvent);
  };

  const handleClose = () => {
    setShowSearchForm(false);
    setSearchTerm("");
    navigate("/");
  };

  const renderSearchForm = () => {
    return (
      <div className="relative w-full">
        <form
          onSubmit={handleSearch}
          className="flex-1 py-2 text-slate-900 dark:text-slate-100"
        >
          <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1.5 px-5 h-full rounded">
            {renderMagnifyingGlassIcon()}
            <input
              ref={inputRef}
              type="text"
              value={searchTerm} // Controlled input with searchTerm
              placeholder="Type and press enter"
              className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base"
              autoFocus
              onFocus={getRecentSearch} // Fetch recent searches on input focus
              onChange={getSearchSuggestion}
            />
            <button type="button" onClick={handleClose}>
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          <input type="submit" hidden value="" />
        </form>

        {/* Suggestions Dropdown */}
        {searchSuggestions.length > 0 && (
          <div className="absolute top-12 left-0 right-0 bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto z-50">
            <ul className="py-2">
              {searchSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.product_name)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {suggestion.product_name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recent Searches Dropdown */}
        {recentSearches.length > 0 && searchTerm === "" && (
          <div className="absolute top-12 left-0 right-0 bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto z-50">
            <ul className="py-2">
              {recentSearches.map((search, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {search}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="h-20 flex justify-between">
        <div className="flex items-center lg:hidden flex-1">
          <MenuBar />
        </div>

        <div className="flex flex-1 items-center justify-center">
          <h1>
            <NavLink to="/">
              <img src={sellWidelyLogo} alt="Almaa logo" />
            </NavLink>
          </h1>
        </div>

        <div className="flex-auto hidden lg:flex justify-center mx-4">
          {showSearchForm ? renderSearchForm() : <Navigation />}
        </div>

        <div className="flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100">
          {!showSearchForm && (
            <button
              className="hidden lg:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center"
              onClick={() => setShowSearchForm(!showSearchForm)}
            >
              {renderMagnifyingGlassIcon()}
            </button>
          )}
          <AvatarDropdown />
          {/* {isLoggedIn && (
            <>
              <AvatarDropdown />
            </>
          )} */}
          {/* {!isLoggedIn && (
            <>
              <Link to="/login">Login</Link>
            </>
          )} */}
          <CartDropdown />
        </div>
      </div>
    );
  };

  return (
    <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
      <div className="container px-2">{renderContent()}</div>
    </div>
  );
};

export default Navbar;
