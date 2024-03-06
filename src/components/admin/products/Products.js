import React, {useState, useEffect, useContext} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faTimes, faPlus, faCheck, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {Context} from "../../../index";

const Products = () => {
    const adminController = useContext(Context);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        adminController.adminController.getAllProducts().then(r => setProducts(adminController.adminController.products));
    }, []);
    const [productId, setProductId] = useState(0);
    const [productName, setProductName] = useState('');
    const [categoryId, setCategoryId] = useState(0);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [type, setType] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [editModes, setEditModes] = useState(Array(products.length).fill(true));
    const [isActive, setIsActive] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState(null);

    // Temporary state for changes during editing
    const [tempProductId, setTempProductId] = useState(0);
    const [tempProductName, setTempProductName] = useState('');
    const [tempCategoryId, setTempCategoryId] = useState(0);
    const [tempPrice, setTempPrice] = useState(0);
    const [tempQuantity, setTempQuantity] = useState(0);
    const [tempType, setTempType] = useState('');
    const [tempPhotoUrl, setTempPhotoUrl] = useState('');

    const handleEdit = (index) => {
        setEditModes(prevEditModes => {
            const updatedEditModes = [...prevEditModes];
            updatedEditModes[index] = !updatedEditModes[index];

            // If entering edit mode, save current values to temporary state
            if (updatedEditModes[index]) {
                setTempProductId(products[index].productId);
                setTempProductName(products[index].productName);
                setTempCategoryId(products[index].categoryId);
                setTempPrice(products[index].price);
                setTempQuantity(products[index].quantity);
                setTempType(products[index].type);
                setTempPhotoUrl(products[index].photoUrl);
            }

            return updatedEditModes;
        });
    }

    const handleCheck = (index) => {
        // Create a new edited product object
        const editedProduct = {
            ...products[index],
            productId: Number(tempProductId),
            productName: tempProductName,
            categoryId: tempCategoryId,
            price: tempPrice,
            quantity: tempQuantity,
            type: tempType,
            photoUrl: tempPhotoUrl,
        };

        // Update only the edited product in the state
        setProducts(prevProducts => {
            const updatedProducts = [...prevProducts];
            updatedProducts[index] = editedProduct;
            return updatedProducts;
        });
        console.log('edited product b4 sending info: ', editedProduct)
        // Call the updateProduct function with the edited product
        adminController.adminController.updateProduct(
            editedProduct.productId,
            editedProduct.productName,
            editedProduct.categoryId,
            editedProduct.price,
            editedProduct.quantity,
            editedProduct.type,
            editedProduct.photoUrl,

        );

        // Exit edit mode
        setEditModes(prevEditModes => {
            const updatedEditModes = [...prevEditModes];
            updatedEditModes[index] = false;
            return updatedEditModes;
        });
    }


    const handleCancel = (index) => {
        // Restore original values from the product to the temporary state
        setTempProductId(Number((products[index].productId)));
        setTempProductName(products[index].productName);
        setTempCategoryId(products[index].categoryId);
        setTempPrice(products[index].price);
        setTempQuantity(products[index].quantity);
        setTempType(products[index].type);
        setTempPhotoUrl(products[index].photoUrl);

        // Exit edit mode
        setEditModes(prevEditModes => {
            const updatedEditModes = [...prevEditModes];
            updatedEditModes[index] = false;
            return updatedEditModes;
        });
    }

    const handleDelete = (index) => {
        setDeleteProductId(index)
        setIsConfirm(!isConfirm)
    }

    const handleCreate = () => {
        setIsActive(!isActive);
    }

    const handleSubmit = () => {
        console.log(deleteProductId);
        adminController.adminController.deleteProduct(deleteProductId).then(() => {
            setIsConfirm(false);
            setDeleteProductId(null);
        });
    }

    const handleCancelDelete = () => {
        setIsConfirm(false);
        setDeleteProductId(null);
    };

    return (
        <>
            <div className="users-wrapper">
                <div className="add-product" onClick={handleCreate}><FontAwesomeIcon icon={faPlus}/></div>
                {products.map((product, index) => (
                    <div className="user" key={index}>
                        <input type="number" value={editModes[index] ? tempProductId : product.productId}
                               onChange={(e) => setTempProductId(e.target.value)} readOnly={true}/>
                        <input className={editModes[index] ? 'edit' : ''} type="text"
                               value={editModes[index] ? tempProductName : product.productName}
                               onChange={(e) => setTempProductName(e.target.value)} readOnly={!editModes[index]}/>
                        <input className={editModes[index] ? 'edit' : ''} type="text"
                               value={editModes[index] ? tempType : product.type}
                               onChange={(e) => setTempType(e.target.value)} readOnly={!editModes[index]}/>
                        <input className={editModes[index] ? 'edit' : ''} type="number"
                               value={editModes[index] ? tempPrice : product.price}
                               onChange={(e) => setTempPrice(e.target.value)} readOnly={!editModes[index]}/>
                        <input className={editModes[index] ? 'edit' : ''} type="text"
                               value={editModes[index] ? tempQuantity : product.quantity}
                               onChange={(e) => setTempQuantity(e.target.value)} readOnly={!editModes[index]}/>
                        <input className={editModes[index] ? 'edit' : ''} type="text"
                               value={editModes[index] ? tempCategoryId : product.categoryId}
                               onChange={(e) => setTempCategoryId(e.target.value)} readOnly={!editModes[index]}/>
                        <input className={editModes[index] ? 'edit' : ''} type="text"
                               value={editModes[index] ? tempPhotoUrl : product.photoUrl}
                               onChange={(e) => setTempPhotoUrl(e.target.value)} readOnly={!editModes[index]}/>
                        <div>
                            <FontAwesomeIcon className={editModes[index] ? '' : 'vanish'} icon={faCheck}
                                             onClick={() => handleCheck(index)}/>
                        </div>
                        <div>
                            <FontAwesomeIcon className={editModes[index] ? '' : 'vanish'} icon={faTimes}
                                             onClick={() => handleCancel(index)}/>
                        </div>
                        <div>
                            <FontAwesomeIcon className={editModes[index] ? 'vanish' : ''} icon={faPencilAlt}
                                             onClick={() => handleEdit(index)}/>
                        </div>
                        <div>
                            <FontAwesomeIcon className={""} icon={faTrashCan} onClick={() => handleDelete(product.productId)}/>
                        </div>
                    </div>
                ))}
            </div>
            <div className={isConfirm ? "modal confirm" : "modal confirm invisible"}>
                <div className="modal-content">
                    <h1 className="header__primary">Are you Sure about dat?</h1>
                    <div className="modal-btn-wrapper">
                        <button type="submit" onClick={() => handleSubmit()}>Yes</button>
                        <button type="submit" onClick={() => handleCancelDelete()}>No</button>
                    </div>
                </div>
            </div>

            <div className={isActive ? 'modal create-product' : 'modal create-product invisible'}>
                <FontAwesomeIcon icon={faTimes} onClick={handleCreate}/>
                <div className="modal-content">
                    <h1 className="header__primary">Колдуй Брат <br/> Make Things Happen</h1>
                    <div className="modal-btn-wrapper">
                        <form>
                            <div className="product-details">
                                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)}
                                       placeholder="Name"/>
                                <input type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
                                       placeholder="Category Id"/>
                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
                                       placeholder="Price"/>
                                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}
                                       placeholder="Quantity"/>
                                <input type="text" value={type} onChange={(e) => setType(e.target.value)}
                                       placeholder="Type"/>
                                <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)}
                                       placeholder="Photo Url"/>
                            </div>
                            <button onClick={(e) => {
                                e.preventDefault();
                                adminController.adminController.CreateProduct(productName, categoryId, price, quantity, type, photoUrl);
                                console.log(productName);
                                console.log(typeof categoryId);
                                console.log(typeof price);
                                console.log(typeof quantity);
                                console.log(type);
                                console.log(photoUrl);
                            }}>Let me Cook
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Products;
