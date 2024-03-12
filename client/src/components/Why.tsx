
const data = [
    {
        icon:"",
        title:"Master intricate algorithms and data structures."
    },
    {
        icon:"",
        title:"Solve real-world coding challenges curated for JavaScript enthusiasts."
    },
    {
        icon:"",
        title:" Sharpen your problem-solving abilities through hands-on coding exercises."
    },
    {
        icon:"",
        title:"A supportive environment to elevate your coding expertise."
    }
]
function Why() {
  return (
    <>
      <div className="w-full my-10 p-6 flex flex-col">
        <h1 className="text-center text-4xl my-4 font-bold">Outcomes</h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {
            data?.map((item) => (
                <div key={item.title} className="p-4 dark:bg-slate-900 min-h-[150px] bg-zinc-100 rounded-xl drop-shadow-lg hover:drop-shadow-2xl">
                    <h1 className="font-bold sm:text-xl text-base">{item.title}</h1>
                </div>
            ))
        }
        </div>
      </div>

      {/* Video Section start */}
      <div>
        <video autoPlay loop muted className="rounded-lg">
          <source src="/videos/video_landing.mp4" type="video/mp4" />
          Your browser does not support video tag
        </video>
      </div>
      {/* Video Section ends */}
    </>
  );
}

export default Why;
