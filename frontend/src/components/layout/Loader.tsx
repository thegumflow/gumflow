interface Props {
  height?: string;
  width?: string;
  color?: string;
  borderWidth?: string;
}

const Loader = ({ height, width, color, borderWidth = "8px" }: Props) => {
  return (
    <div
      className={`border-gray-300 ${height ? "" : "h-20"} ${
        width ? "" : "w-20"
      }  animate-spin rounded-full border-8 ${
        color ? "" : "border-t-blue-600"
      }`}
      style={{
        height: height,
        width: width,
        borderTopColor: color,
        borderWidth: borderWidth,
      }}
    />
  );
};

export default Loader;
