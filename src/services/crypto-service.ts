import CryptoJS from "crypto-js";
import { Storage as CapacitorStorage } from "@capacitor/storage";
import { Capacitor } from "@capacitor/core";

const secretKey = import.meta.env.VITE_SECRET_KEY;

class CryptoService {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  encryptData(data: unknown): string {
    try {
      const cipherText = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        this.secretKey
      ).toString();

      return cipherText;
    } catch (error) {
      console.error("Encryption failed:", error);
      throw new Error("Data encryption failed.");
    }
  }

  decryptData(cipherText: string): any {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, this.secretKey);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      return decryptedData;
    } catch (error) {
      console.error("Decryption failed:", error);
      throw new Error("Data decryption failed.");
    }
  }

  async setData(key: string, data: unknown): Promise<void> {
    const encryptedData = this.encryptData(data);
    const platform = Capacitor.getPlatform();

    try {
      if (platform === "web") {
        localStorage.setItem(key, encryptedData);
      } else {
        await CapacitorStorage.set({ key, value: encryptedData });
      }
    } catch (error) {
      console.error("Failed to set data:", error);
      throw new Error("Data storage failed.");
    }
  }

  async getData(key: string): Promise<any> {
    const platform = Capacitor.getPlatform();

    try {
      let encryptedData: string | null;

      if (platform === "web") {
        encryptedData = localStorage.getItem(key);
      } else {
        const { value } = await CapacitorStorage.get({ key });
        encryptedData = value;
      }

      if (encryptedData) {
        return this.decryptData(encryptedData);
      }
      return null; // or throw an error if preferred
    } catch (error) {
      console.error("Failed to get data:", error);
      throw new Error("Data retrieval failed.");
    }
  }

  async removeData(key: string): Promise<void> {
    const platform = Capacitor.getPlatform();

    try {
      if (platform === "web") {
        localStorage.removeItem(key);
      } else {
        await CapacitorStorage.remove({ key });
      }
    } catch (error) {
      console.error("Failed to remove data:", error);
      throw new Error("Data removal failed.");
    }
  }

  async clearStorage(): Promise<void> {
    const platform = Capacitor.getPlatform();

    try {
      if (platform === "web") {
        localStorage.clear();
      } else {
        await CapacitorStorage.clear();
      }
    } catch (error) {
      console.error("Failed to clear storage:", error);
      throw new Error("Storage clearance failed.");
    }
  }
}

export default new CryptoService(secretKey);
