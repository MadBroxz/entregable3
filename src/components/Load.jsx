const Load = () => {
  return (
    <div className="overflow-hidden flex justify-center items-center flex-col min-h-screen gap-5 z-10 w-[100wh] bg-black">
      <img
        className="w-[530px] h-[180px]"
        src="/loadd.png"
        alt=""
      />
      <span className="text-xl">Cargando...</span>
    </div>
  );
};
export default Load;
