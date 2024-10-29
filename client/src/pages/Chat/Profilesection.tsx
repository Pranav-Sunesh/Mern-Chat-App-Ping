import pfp from "../../assets/avatar/no pfp.jpg"

const Profilesection = () => {
  return (
    <div
        className="w-full h-full  mr-5 flex justify-end items-center space-x-3"
        >
        <p
            className="text-lg"
            >
                Pranav Sunesh
        </p>
        <img 
            src={pfp}
            alt="Pfp"
            className="w-12 h-12 rounded-[50%]" />
            
    </div>
  );
};

export default Profilesection;