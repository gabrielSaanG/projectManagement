import useBookContext from "../../../Context/BookContext/BookContext";

export default function DetailsDropdown() {

    const {book} = useBookContext()

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold">Detalhes do Livro</h1>
            <div>
                <p className="font-semibold">Publicado em:</p>
                <p>Estados Unidos</p>
            </div>

            <div className="flex gap-2">
                <p className="font-semibold">Numero de paginas:</p>
                <p>206</p>
            </div>

            <div className="flex gap-2">
                <p className="font-semibold">Autor:</p>
                <p>{book.author}</p>
            </div>
        </div>
    )
}