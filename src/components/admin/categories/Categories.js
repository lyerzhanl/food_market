import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes, faPlus, faCheck, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../../index";

const Categories = () => {
    const adminController = useContext(Context);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        adminController.adminController.getAllCategories().then(r => setCategories(adminController.adminController.allCategories.data));
    }, []);

    const [categoryId, setCategoryId] = useState(0);
    const [categoryName, setCategoryName] = useState('');
    const [editModes, setEditModes] = useState(Array(categories.length).fill(true));
    const [isActive, setIsActive] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);

    // Temporary state for changes during editing
    const [tempCategoryId, setTempCategoryId] = useState(0);
    const [tempCategoryName, setTempCategoryName] = useState('');

    const handleEdit = (index) => {
        setEditModes(prevEditModes => {
            const updatedEditModes = [...prevEditModes];
            updatedEditModes[index] = !updatedEditModes[index];

            // If entering edit mode, save current values to temporary state
            if (updatedEditModes[index]) {
                setTempCategoryId(categories[index].categoryId);
                setTempCategoryName(categories[index].categoryName);
            }

            return updatedEditModes;
        });
    }

    const handleCheck = (index) => {
        // Create a new edited category object
        const editedCategory = {
            ...categories[index],
            categoryId: Number(tempCategoryId),
            categoryName: tempCategoryName,
        };

        // Update only the edited category in the state
        setCategories(prevCategories => {
            const updatedCategories = [...prevCategories];
            updatedCategories[index] = editedCategory;
            return updatedCategories;
        });

        // Call the updateCategory function with the edited category
        adminController.adminController.updateCategory(
            editedCategory.categoryId,
            editedCategory.categoryName
        );

        // Exit edit mode
        setEditModes(prevEditModes => {
            const updatedEditModes = [...prevEditModes];
            updatedEditModes[index] = false;
            return updatedEditModes;
        });
    }

    const handleCancel = (index) => {
        // Restore original values from the category to the temporary state
        setTempCategoryId(Number((categories[index].categoryId)));
        setTempCategoryName(categories[index].categoryName);

        // Exit edit mode
        setEditModes(prevEditModes => {
            const updatedEditModes = [...prevEditModes];
            updatedEditModes[index] = false;
            return updatedEditModes;
        });
    }

    const handleDelete = (index) => {
        setDeleteCategoryId(index)
        setIsConfirm(!isConfirm)
    }

    const handleCreate = () => {
        setIsActive(!isActive);
    }

    const handleSubmit = () => {
        adminController.adminController.deleteCategory(deleteCategoryId).then(() => {
            setIsConfirm(false);
            setDeleteCategoryId(null);
        });
    }

    const handleCancelDelete = () => {
        setIsConfirm(false);
        setDeleteCategoryId(null);
    };

    return (
        <>
            <div className="users-wrapper">
                <div className="add-product" onClick={handleCreate}><FontAwesomeIcon icon={faPlus} /></div>
                {categories.map((category, index) => (
                    <div className="user" key={index}>
                        <input type="number" value={editModes[index] ? tempCategoryId : category.categoryId}
                               onChange={(e) => setTempCategoryId(e.target.value)} readOnly={true} />
                        <input className={editModes[index] ? 'edit' : ''} type="text"
                               value={editModes[index] ? tempCategoryName : category.categoryName}
                               onChange={(e) => setTempCategoryName(e.target.value)} readOnly={!editModes[index]} />
                        <div>
                            <FontAwesomeIcon className={editModes[index] ? '' : 'vanish'} icon={faCheck}
                                             onClick={() => handleCheck(index)} />
                        </div>
                        <div>
                            <FontAwesomeIcon className={editModes[index] ? '' : 'vanish'} icon={faTimes}
                                             onClick={() => handleCancel(index)} />
                        </div>
                        <div>
                            <FontAwesomeIcon className={editModes[index] ? 'vanish' : ''} icon={faPencilAlt}
                                             onClick={() => handleEdit(index)} />
                        </div>
                        <div>
                            <FontAwesomeIcon className={""} icon={faTrashCan} onClick={() => handleDelete(category.categoryId)} />
                        </div>
                    </div>
                ))}
            </div>
            <div className={isConfirm ? "modal confirm" : "modal confirm invisible"}>
                <div className="modal-content">
                    <h1 className="header__primary">Are you sure about deleting this category?</h1>
                    <div className="modal-btn-wrapper">
                        <button type="submit" onClick={() => handleSubmit()}>Yes</button>
                        <button type="submit" onClick={() => handleCancelDelete()}>No</button>
                    </div>
                </div>
            </div>

            <div className={isActive ? 'modal create-product' : 'modal create-product invisible'}>
                <FontAwesomeIcon icon={faTimes} onClick={handleCreate} />
                <div className="modal-content">
                    <h1 className="header__primary">Add a New Category</h1>
                    <div className="modal-btn-wrapper">
                        <form>
                            <div className="product-details">
                                <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}
                                       placeholder="Category Name" />
                            </div>
                            <button onClick={(e) => {
                                e.preventDefault();
                                adminController.adminController.createCategory(categoryName);
                            }}>Add Category</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Categories;
