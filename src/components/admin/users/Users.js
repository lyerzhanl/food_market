import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPencilAlt, faTimes, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import AdminController from '../../../admin/AdminController';
import { Context } from '../../../index';

const Users = () => {
    const adminController = useContext(Context);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        adminController.adminController.getAllUsers().then((r) => setUsers(adminController.adminController.allUsers.data));
    }, []);

    // id email name phone role
    const [tempUserId, setTempUserId] = useState(0);
    const [tempEmail, setTempEmail] = useState('');
    const [tempName, setTempName] = useState('');
    const [tempPhone, setTempPhone] = useState('');
    const [tempRole, setTempRole] = useState('');

    const [editModes, setEditModes] = useState(Array(users.length).fill(false));
    const [isConfirm, setIsConfirm] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);

    const handleEdit = (index) => {
        setEditModes((prevEditModes) => {
            const updatedEditModes = [...prevEditModes];
            updatedEditModes[index] = !updatedEditModes[index];

            if (updatedEditModes[index]) {
                setTempUserId(users[index].userId);
                setTempRole(users[index].role);
                setTempPhone(users[index].phone);
                setTempName(users[index].name);
                setTempEmail(users[index].email);
            }

            return updatedEditModes;
        });
    };

    const handleCheck = (index) => {
        const editedUser = {
            ...users[index],
            userId: tempUserId,
            email: tempEmail,
            name: tempName,
            phone: tempPhone,
            role: tempRole,
        };

        setUsers((prevUsers) => {
            const updatedUsers = [...prevUsers];
            updatedUsers[index] = editedUser;
            return updatedUsers;
        });

        console.log(editedUser)

        adminController.adminController.updateUser(
            editedUser.userId,
            editedUser.email,
            editedUser.name,
            editedUser.phone,
            editedUser.role
        );

        setEditModes((prevEditModes) => {
            const updatedEditModes = [...prevEditModes];
            updatedEditModes[index] = false;
            return updatedEditModes;
        });
    };

    const handleCancel = (index) => {
        setTempUserId(users[index].userId);
        setTempEmail(users[index].email);
        setTempPhone(users[index].phone);
        setTempName(users[index].name);
        setTempRole(users[index].role);

        setEditModes((prevEditModes) => {
            const updatedEditModes = [...prevEditModes];
            updatedEditModes[index] = false;
            return updatedEditModes;
        });
    };

    const handleDelete = (userId) => {
        setDeleteUserId(userId);
        setIsConfirm(true);
    };

    const confirmDelete = () => {
        console.log(deleteUserId);
        adminController.adminController.deleteUser(deleteUserId).then(() => {
            setIsConfirm(false);
            setDeleteUserId(null);
        });
    };

    const handleCancelDelete = () => {
        setIsConfirm(false);
        setDeleteUserId(null);
    };

    return (
        <>
            <div className="users-wrapper">
                {users.map((user, index) => (
                    <div className="user" key={user.userId}>
                        <input
                            type="number"
                            value={editModes[index] ? tempUserId : user.userId}
                            onChange={(e) => setTempUserId(e.target.value)}
                            readOnly={true}
                        />
                        <input
                            className={editModes[index] ? 'edit' : ''}
                            type="text"
                            value={editModes[index] ? tempName : user.name}
                            onChange={(e) => setTempName(e.target.value)}
                            readOnly={!editModes[index]}
                        />
                        <input
                            className={editModes[index] ? 'edit' : ''}
                            type="text"
                            value={editModes[index] ? tempEmail : user.email}
                            onChange={(e) => setTempEmail(e.target.value)}
                            readOnly={!editModes[index]}
                        />
                        <input
                            className={editModes[index] ? 'edit' : ''}
                            type="text"
                            value={editModes[index] ? tempPhone : user.phone}
                            onChange={(e) => setTempPhone(e.target.value)}
                            readOnly={!editModes[index]}
                        />
                        <input
                            className={editModes[index] ? 'edit' : ''}
                            type="text"
                            value={editModes[index] ? tempRole : user.role}
                            onChange={(e) => setTempRole(e.target.value)}
                            readOnly={!editModes[index]}
                        />
                        <div>
                            <FontAwesomeIcon
                                className={editModes[index] ? '' : 'vanish'}
                                icon={faCheck}
                                onClick={() => handleCheck(index)}
                            />
                        </div>
                        <div>
                            <FontAwesomeIcon
                                className={editModes[index] ? '' : 'vanish'}
                                icon={faTimes}
                                onClick={() => handleCancel(index)}
                            />
                        </div>
                        <div>
                            <FontAwesomeIcon
                                className={editModes[index] ? 'vanish' : ''}
                                icon={faPencilAlt}
                                onClick={() => handleEdit(index)}
                            />
                        </div>
                        <div>
                            <FontAwesomeIcon
                                className=""
                                icon={faTrashCan}
                                onClick={() => handleDelete(user.userId)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className={isConfirm ? 'modal confirm' : 'modal confirm invisible'}>
                <div className="modal-content">
                    <h1 className="header__primary">Are you Sure about dat?</h1>
                    <div className="modal-btn-wrapper">
                        <button type="submit" onClick={confirmDelete}>
                            Yes
                        </button>
                        <button type="submit" onClick={handleCancelDelete}>
                            No
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Users;
