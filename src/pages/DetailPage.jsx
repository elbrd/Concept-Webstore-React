import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Detailcard from "../components/Detailcard"
import { getProduct } from "../scripts/api/api";


const DetailPage = () => {
    const { id } = useParams();

    const [product, setProduct] = useState([]);
    
    useEffect(() => {
        async function fetchData(id) {
            const data = await getProduct(id);
            setProduct(data);
        }

        fetchData(id);
    }, [id]);

    return (
        <main className="product-page">
            <Detailcard product={ product }/>
        </main>
    )
}

export default DetailPage