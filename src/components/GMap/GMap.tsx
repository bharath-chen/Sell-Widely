interface Props {
  width?: string;
  height?: string;
}

const GMap = ({ width = "100%", height = "100%" }: Props) => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7774.352396480873!2d80.225044!3d13.024449!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526655c38d2993%3A0x54b714477f05829b!2sAlmaa%20Siddha%20Care%20Multispeciality%20Hospital!5e0!3m2!1sen!2sus!4v1726594030466!5m2!1sen!2sus"
      allowFullScreen={true}
      style={{
        display: "block",
        height: `${height}`,
        width: `${width}`,
        border: "none",
      }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

export default GMap;
