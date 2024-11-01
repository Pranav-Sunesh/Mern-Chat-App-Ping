import pfp from "../../assets/avatar/no pfp.jpg"

const Profilesection = () => {
  return (
    <div
        className="w-full h-full bg-white rounded-md  mr-3 flex justify-end items-center space-x-3 px-5"
        >
        <p
            className="text-lg"
            >
                {localStorage.getItem('username')}
        </p>
        <img 
            src={pfp}
            alt="Pfp"
            className="w-12 h-12 rounded-[50%]" />
            
    </div>
  );
};

export default Profilesection;