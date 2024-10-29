
const Chatsecbody = () => {

    const messages: string[] = ["Hello", "Hi", "So Whats up"]

  return (
    <div
        className="w-full h-[75%] flex-col-reverse"
        >
            {messages.map((message, index) => (
                <div key={index}>{message}</div>
            ))}
    </div>
  );
};

export default Chatsecbody;