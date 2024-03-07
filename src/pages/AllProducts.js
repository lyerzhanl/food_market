import React, { useEffect, useState } from 'react';
import potato from "../img/potato.png";

function AllProducts(props) {
    const [allProducts, setAllProducts] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [showScroller, setShowScroller] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentItems, setCurrentItems] = useState([]);
    const [filterItem, setFilterItem] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsResponse, categoriesResponse] = await Promise.all([
                    fetch('http://localhost:4001/products').then((response) =>
                        response.json()
                    ),
                    fetch('http://localhost:4001/categories').then((response) =>
                        response.json()
                    ),
                ]);

                // Ensure "All" is the first element in allCategories
                console.log(categoriesResponse)
                setAllCategories([{categoryId: 0, categoryName: 'All'}, ...categoriesResponse]);

                setAllProducts(productsResponse);
                checkOverflow();
                setCurrentItems(productsResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const checkOverflow = () => {
        const categoriesContainer = document.querySelector('.categories-carousel');
        const showScrollIndicator =
            categoriesContainer.scrollWidth > categoriesContainer.clientWidth;
        setShowScroller(showScrollIndicator);
    }

    const scrollRight = () => {
        const categoriesContainer = document.querySelector('.categories-carousel');
        categoriesContainer.scrollLeft += 100;
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }

    const filteredProducts = currentItems.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const chooseCategory = (categoryId) => {
        if (categoryId === 0) {
            setCurrentItems(allProducts);
            return;
        }
        const filteredItems = allProducts.filter((item) => item.categoryId === categoryId);
        setCurrentItems(filteredItems);
    };

    return (
        <div className="allProducts-wrapper">
            <h1 className="header__primary">Search Products By</h1>
            <div className="search-bar">
                <p>Product Name:</p>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className="categories">
                <p>Category: </p>
                <div className="categories-carousel">
                    {allCategories.map((category) => (
                        <div
                            key={category.categoryName}
                            onClick={() => chooseCategory(category.categoryId)}
                        >
                            {category.categoryName}
                        </div>
                    ))}

                </div>
                {showScroller && (
                    <div className="scroller" onClick={scrollRight}>
                        &gt;
                    </div>
                )}
            </div>

            <main>
                {filteredProducts.map((product) => (
                    <div className="item-wrapper" key={product.id}>
                        <div className="item">
                            <img src={potato} alt="img" />
                            <h2>{product.productName}</h2>
                            <b>{product.price + " tg / " + product.type}</b>
                            <div
                                className="add-to-cart"
                                onClick={() => props.onAdd(product)}
                            >
                                +
                            </div>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}

export default AllProducts;