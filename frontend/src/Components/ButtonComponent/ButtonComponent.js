export default function ButtonComponent({props, text}){
    return (
        <button className="flex justify-center items-center bg-orange-500 rounded h-10 hover:bg-orange-600 transition-colors text-white font-semibold p-4">{text}</button>
    )
}