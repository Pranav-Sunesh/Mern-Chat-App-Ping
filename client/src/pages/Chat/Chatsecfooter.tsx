
const Chatsecfooter = () => {
  return (
    <div
        className="w-full h-[10%] "
        >
            <form 
                action=""
                className="w-full h-full flex justify-center items-center space-x-1"
                >
                <input 
                    type="text"
                    className="w-1/2 p-2 rounded-md border border-black focus:outline-none text-sm" 
                    placeholder="Message"
                    />
                <input 
                    type="submit"
                    value={'Send'} 
                    className="bg-white p-2 shadow rounded hover:bg-gray-50 active:bg-gray-100 border border-black"
                    />
            </form>
    </div>
  );
};

export default Chatsecfooter;