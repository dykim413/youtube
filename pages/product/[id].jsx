import styles from "../../styles/Product.module.css";
import Image from "next/image";
import {useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {addProduct} from "../../redux/cartSlice";

const Product = ({pizza}) => {
    const dispatch = useDispatch();

    const [size, setSize]           = useState(0);
    const [price, setPrice]         = useState(pizza.prices[0]);
    const [extras, setExtras]       = useState([]);
    const [quantity, setQuantity]   = useState(1);

    const handleChange = (e, opt) => {
        const checked = e.target.checked;
        if( checked ) {
            changePrice( opt.price );
            setExtras([...extras, opt]);
        } else {
            changePrice(-opt.price);

            // 체크해지시 현재 선택된 추가옵션 배열에서 선택한 옵션을 제외한 나머지로 추가옵션을 재정의 한다.
            setExtras(extras.filter(extra => extra._id !== opt._id));
        }
    }

    const handleSize = (index) => {
        const diff = pizza.prices[ index ] - pizza.prices[size];
        setSize( index );
        changePrice(diff)
    }

    const changePrice = (number) => {
        setPrice(price + number);
    }

    const handleClickCart = () => {
        dispatch( addProduct({...pizza, extras, price, quantity}) );
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
                </div>
            </div>
            <div className={styles.right}>
                <h1 className={styles.title}>{pizza.title}</h1>
                <span className={styles.price}>{price}</span>
                <p className={styles.desc}>{pizza.desc}</p>
                <h3 className={styles.choose}>Choose the size</h3>
                <div className={styles.sizes}>
                    <div className={styles.size} onClick={() => handleSize(0)}>
                        <Image src="/img/size.png" layout="fill" alt="" />
                        <span className={styles.number}>Small</span>
                    </div>
                    <div className={styles.size} onClick={() => handleSize(1)}>
                        <Image src="/img/size.png" layout="fill" alt="" />
                        <span className={styles.number}>Medium</span>
                    </div>
                    <div className={styles.size} onClick={() => handleSize(2)}>
                        <Image src="/img/size.png" layout="fill" alt="" />
                        <span className={styles.number}>Large</span>
                    </div>
                </div>
                <h3 className={styles.choose}>Choose additional ingredients</h3>
                <div className={styles.ingredients}>
                    {pizza.extraOptions.map( opt => {
                        return (
                            <div className={styles.option} key={opt._id}>
                                <input type="checkbox" id={opt.text} name={opt.text} className={styles.checkbox} onChange={ e => handleChange(e, opt)} />
                                <label htmlFor={opt.text}>{opt.text}</label>
                            </div>
                        );
                    })}
                </div>
                <div className={styles.add}>
                    <input type="number" defaultValue={quantity} className={styles.quantity} onChange={ e => setQuantity(e.target.value) } />
                    <button className={styles.button} onClick={handleClickCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async ({params}) => {
    const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
    return {
        props: {
            pizza: res.data,
        }
    }
}

export default Product;
