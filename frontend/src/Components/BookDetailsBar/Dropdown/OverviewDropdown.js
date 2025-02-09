import useBookContext from "../../../Context/BookContext/BookContext";

export default function OverviewDropdown() {

    const {bookPage} = useBookContext();


    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold">Overview do Livro</h1>
            <div className="w-full">
                <p className="font-semibold">Sinopse do livro:</p>
                <p className="mt-4">{bookPage.description}</p>
            </div>
        </div>
    )
}