import GoBackButton from "../components/GoBackButton";
import ChatFeed from "../components/messages/ChatFeed";
import styles from "../styles/ProjectPage.module.css";

export default function Page() {
  const title = "Mobility";
  const subtitle = "Bike Immobility";
  const images = [
    "https://cdn.discordapp.com/attachments/1154765966799020063/1159800078454767668/12nora121212_a_slice_of_an_architectural_project_of_an_undergro_0d75d6bb-84ec-4b49-a8bb-891eaa4ac08c.png?ex=65bcc47e&is=65aa4f7e&hm=e53837962523ef22e0c37e373dcdd92be1b8f4846dfccf8aa1e02f564f7adeb0&",
    "https://media.discordapp.net/attachments/1154765966799020063/1154800087499804774/lerageux._tired_female_student_biking_to_work_in_Lausanne_by_th_e02bb052-f985-4857-aa6b-0c0968e09744.png?ex=65bd08e4&is=65aa93e4&hm=661cdeb11aa2e19f73b10b290727a26ccdc08553e110e7cae01a67c5c79c9ebd&=&format=webp&quality=lossless&width=1351&height=1351",
    "https://media.discordapp.net/attachments/1154765966799020063/1200246085919195236/lerageux._an_automatic_underground_bike_storage_in_lausanne_f5579150-42f7-43c3-b578-f95cf5525a61.png?ex=65c57b46&is=65b30646&hm=914cda178f1aeeac0731ce43ae6402e596d1075863f4f21580ec7d86604a78ef&=&format=webp&quality=lossless&width=1351&height=1351",
    "https://cdn.discordapp.com/attachments/1154765966799020063/1155125881887522856/12nora121212_a_futur_where_the_cycliste_have_a_projector_light__d61e1dcc-a42f-4acf-81b4-6d2575483838.png?ex=65be384f&is=65abc34f&hm=61806c11eec983c000e0b9367125c05c9d4240bf9d995bbf6a67579af4384428&",
    "https://media.discordapp.net/attachments/1154765966799020063/1157251307791450122/lerageux._a_futur_where_the_cycliste_have_a_projector_light_sys_bae2aad1-c85c-4ca3-bb25-eb1f6d7f6c34.png?ex=65bcb944&is=65aa4444&hm=6f54d1a8684b4ebd48ac9d857c1305d7a9652bc4bfd5083cd8c5475d29e34ee8&=&format=webp&quality=lossless&width=2026&height=1351",
    "https://media.discordapp.net/attachments/1154765966799020063/1155137589955788820/12nora121212_a_slice_of_an_architectural_project_of_an_undergro_d87b2a8f-7d3a-44b4-9027-1797ad190467.png?ex=65be4336&is=65abce36&hm=7a95edd0ee42f1395eaf58c223ce748527e97e757e828921022094f628fbddf9&=&format=webp&quality=lossless&width=1351&height=1351",
    "https://media.discordapp.net/attachments/1154765966799020063/1154913631151079574/lerageux._tired_female_student_biking_to_work_in_Lausanne_in_tr_bfab75fb-379c-4533-bb0b-3b5ee2be288c.png?ex=65bd72a2&is=65aafda2&hm=ce6f2c7f76f13cbc884d1e623b953d65a9bdd492db6598cfd76a458bc213672e&=&format=webp&quality=lossless&width=1351&height=1351",
  ];
  return (
    <div className="w-full flex flex-col items-center mt-10 px-20 pb-20">
      <GoBackButton />
      <div className="w-full max-w-[1000px] flex flex-col items-start pl-20">
        <h1 className={`text-8xl font-bold ${styles.txt}`}>{title}</h1>
        <h2 className={`text-5xl font-extralight ${styles.txt} mt-5`}>
          {subtitle}
        </h2>
      </div>

      <div
        className={`max-w-[1000px] grid aspect-square grid-cols-3 mt-20 gap-4 ${styles.grid}`}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`row-span-1 rounded-xl overflow-hidden hover:scale-105 transition-all  ${
              index === 4 ? "col-span-2" : ""
            } ${index === 0 ? "col-span-2 row-span-2" : ""} ${
              index === 3 ? "row-span-2" : ""
            }`}
          >
            <img
              key={index}
              src={image}
              alt={`Project ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className={styles.right}>
        <ChatFeed messages={[]} chatEnabled={true} />
      </div>
    </div>
  );
}
