const MyButton = ({ text, type, onClick }) => {
  // 예외처리 => btnType 배열에 없는 값이 들어오면
  // 강제로 default type으로 btnType을 바꿔버림
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    // className에 배열을 넣어줌
    // 배열을 join() 메서드를 활용하여 문자열로 합쳐준다
    // MyButton_${type}를 통해 type를 받아와 동적으로 className을 지정해줄 수 있다
    <button
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

// type prop을 전달받지 않은 경우 = default
MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
