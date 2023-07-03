import Navbar from '../../components/Navbar';



import { useEffect, useState } from 'react';

const Transactions = ({ onDeleteTransaction }) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [componentLoading, setComponentLoading] = useState(true);
    const [newTransaction, setNewTransaction] = useState({
        date: '',
        category: '',
        amount: '',
        account: '',
        accountTo: '',
        type: ''
    }, []);

    useEffect(() => {
        loadTransactions();
    })

    const loadTransactions = async () => {
        let res = await fetch("api/transactions", {
            method: "GET"
        });
        let data = await res.json();
        if (!res.ok) {
            throw new Error('Failed to fetch transactions');
        }
        setTransactions(data.transactions)
        setComponentLoading(false)
    }

    const handleDelete = (id) => {
        onDeleteTransaction(id);
    };

    const handleAddFormToggle = () => {
        setShowAddForm(!showAddForm);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTransaction({ ...newTransaction, [name]: value });
    };

    const getUniqueAccountNames = () => {
        const uniqueAccountNames = [...new Set(transactions.map(transaction => transaction.account))];
        return uniqueAccountNames;
    }

    const handleAddTransaction = async (e) => {
        e.preventDefault();
        // Add your logic to handle adding a new transaction
        // e.g., call an API, update state, etc.
        console.log('New Transaction:', newTransaction);
        let res = await fetch("api/transactions/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newTransaction),
        });
        let data = await res.json();
        console.log('data:',data)
        if (!res.ok) {
            throw new Error('Failed to add transaction');
        }
        // Clear the form fields
        setNewTransaction({
            date: '',
            category: '',
            amount: '',
            account: '',
            type: ''
        });
        setShowAddForm(false);

        loadTransactions();
    };


    if (componentLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <h2 className="text-2xl font-bold">Transactions</h2>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded focus:outline-none"
                        onClick={handleAddFormToggle}
                    >
                        Add New Transaction
                    </button>
                </div>

                {showAddForm && (
                    <form className="my-4" onSubmit={handleAddTransaction}>
                        <div className="flex flex-wrap mb-4">
                            <div className="mr-4 mb-2">
                                <label htmlFor="date" className="block font-semibold">
                                    Date:
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={newTransaction.date}
                                    onChange={handleInputChange}
                                    className="border rounded py-1 px-2 w-40"
                                />
                            </div>

                            <div className="mr-4 mb-2">
                                <label htmlFor="category" className="block font-semibold">
                                    Category:
                                </label>
                                <input
                                    type="text"
                                    id="category"
                                    name="category"
                                    value={newTransaction.category}
                                    onChange={handleInputChange}
                                    className="border rounded py-1 px-2 w-40"
                                />
                            </div>

                            <div className="mr-4 mb-2">
                                <label htmlFor="amount" className="block font-semibold">
                                    Amount:
                                </label>
                                <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={newTransaction.amount}
                                    onChange={handleInputChange}
                                    className="border rounded py-1 px-2"
                                    step="0.01"
                                />
                            </div>

                            <div className="mr-4 mb-2">
                                <label htmlFor="account" className="block font-semibold">
                                    Account:
                                </label>
                                <select
                                    id="account"
                                    name="account"
                                    value={newTransaction.account}
                                    onChange={handleInputChange}
                                    className="border rounded py-1 px-2 w-40"
                                >
                                    <option value="">Select Account</option>
                                    {getUniqueAccountNames().map((accountName) => (
                                        <option value={accountName} key={accountName}>
                                            {accountName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mr-4 mb-2">
                                <label htmlFor="type" className="block font-semibold">
                                    Type:
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    value={newTransaction.type}
                                    onChange={handleInputChange}
                                    className="border rounded py-1 px-2 w-40"
                                >
                                    <option value="">Select Type</option>
                                    <option value="Income">Income</option>
                                    <option value="Expense">Expense</option>
                                    <option value="Transfer">Transfer</option>
                                </select>
                            </div>
                        </div>

                        {/* Add more form fields for other transaction properties */}

                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded focus:outline-none"
                        >
                            Add Transaction
                        </button>
                    </form>




                )}

                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Category</th>
                            <th className="border px-4 py-2">Amount</th>
                            <th className="border px-4 py-2">Account</th>
                            <th className="border px-4 py-2">Type</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction._id}>
                                <td className="border px-4 py-2">{transaction.date}</td>
                                <td className="border px-4 py-2">{transaction.category}</td>
                                <td className="border px-4 py-2">{transaction.amount}</td>
                                <td className="border px-4 py-2">{transaction.account}</td>
                                <td className="border px-4 py-2">{transaction.type}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-2 py-1 rounded focus:outline-none mr-2"
                                        onClick={() => handleEditTransaction(transaction.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-2 py-1 rounded focus:outline-none"
                                        onClick={() => handleDelete(transaction.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Transactions;
