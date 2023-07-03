import Navbar from '../components/Navbar';
import Tile from '../components/Tile';
import { BankNotes, CreditCard, Transaction, Expense } from '../components/SVGIcons'
import SpendingLineChart from '../components/SpendingLineChart';
import PieChart from '../components/PieChart';
import Dropdown from '../components/Dropdown';
import BalanceTile from '../components/BalanceTile';
import withAuth from '../utils/withAuth';
import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';



function Home() {

  const { user, error, isLoading } = useUser();
  const [accounts,setAccounts] = useState([]);
  const [transactions,setTransactions] = useState([]);
  const [componentLoading, setComponentLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');

  useEffect(() => {
    loadAccounts();
    loadTransactions();
  }, [selectedMonth,selectedAccount]);

  
  const loadAccounts = async () =>{
    let res = await fetch("api/accounts", {
      method: "GET"
    });
    let data = await res.json();
    if (!res.ok) {
      throw new Error('Failed to fetch accounts');
    }
    setAccounts(data.accounts)

    // if (selectedAccount && selectedAccount !== 'All')
    // {
    //   const filteredAccounts = data.accounts.filter((account) => account.name === selectedAccount);
    //   setAccounts(filteredAccounts)
    // }else{
    //   setAccounts(data.accounts)
    // }
  }

  const loadTransactions = async () =>{
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

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };

  const getMonthsAndYears = () => {
    const uniqueMonthsAndYears = new Set();
  
    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      uniqueMonthsAndYears.add(monthYear);
    });
  
    // Convert the set to an array and sort it in descending order
    const sortedMonthsAndYears = [...uniqueMonthsAndYears].sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateB - dateA;
    });
  
    return sortedMonthsAndYears;
  };

  const getAccountNames = () => {
    return accounts.map(account => account.name);
  }

  const getTotalIncome = () => {
    let filteredTransactions = filterTransactions()
    let totalIncome = 0;

    filteredTransactions.forEach((transaction) => {
    if (transaction.type === "Income") {
      totalIncome += transaction.amount;
    }
  });

  return totalIncome;
  }

  const getTotalExpense= () => {
    let filteredTransactions = filterTransactions()

    let totalExpense = 0;
    filteredTransactions.forEach((transaction) => {
    if (transaction.type === "Expense") {
      totalExpense += transaction.amount;
    }
  });
  return totalExpense;
  }

  const getTotalTransfers = () => {
    let filteredTransactions = filterTransactions()

    let totalTransfers = 0;
    filteredTransactions.forEach((transaction) => {
    if (transaction.type === "Transfer") {
      totalTransfers += transaction.amount;
    }
  });
  return totalTransfers;
  }

  const getTotalAmount = () => {
    return 0;
  }

  const filterAccounts = () =>{
    if(!selectedAccount || selectedAccount === 'all') return accounts
    const filteredAccounts = accounts.filter((account) => account.name === selectedAccount);
    return filteredAccounts
  }

  const filterTransactions = () => {
    const filteredTransactions = transactions.filter((transaction) => {
      const date = new Date(transaction.date);
      const monthYear = date.toLocaleString('en-us', { month: 'long', year: 'numeric' });
      const isMonthYearMatch = (!selectedMonth || selectedMonth === 'all') ? true : selectedMonth === monthYear;
      const isAccountMatch = (!selectedAccount || selectedAccount === 'all') ? true : transaction.account === selectedAccount;
      return isMonthYearMatch && isAccountMatch;
    });
  
    return filteredTransactions;
  }
  
  
  if (componentLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className='container flex mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-2'>
        <div id="filters" className='bg-white shadow-xl p-6 flex flex-col'>
          <h3 className='font-bold'>Filters</h3>
          <div className='mt-2'>
            <div className='text-gray-600 font-semibold'>Period</div>
            <Dropdown data={getMonthsAndYears()} onChange={handleMonthChange} />
          </div>

          <div className='mt-2'>
            <div className='text-gray-600 font-semibold'>Account</div>
            <Dropdown data={getAccountNames()} onChange={handleAccountChange}/>
          </div>

        </div>
        <div id='dashboard' className='w-full'>
          <h3 className='mx-6 px-2 font-bold'>Dashboard</h3>
          <div id='tiles' className="flex justify-between mt-2">
            <Tile title="Income" amount={`$${getTotalIncome()}`} style="text-green-500 " IconImage={BankNotes} />
            <Tile title="Expenses" amount={`$${getTotalExpense()}`} style="text-red-500 " IconImage={Expense} />
            <Tile title="Transfers" amount={`$${getTotalTransfers()}`} style="text-blue-500" IconImage={Transaction} />
            <Tile title="Total Balance" amount={`$${getTotalAmount()}`} style="text-orange-500" IconImage={CreditCard} />
          </div>
          <div id="charts" className='flex m-2 justify-equally'>
            <div className='bg-white shadow-xl p-6 rounded basis-2/3'>
              <SpendingLineChart />
            </div>
            <div className='bg-white shadow-xl p-6 ml-4 rounded basis-1/3'>
              <PieChart />
            </div>
          </div>
          <div id="balances" className='bg-white shadow-xl p-6 m-2'>
            <h3 className='px-2 font-bold'>Balances</h3>
            <div className='flex'>
              {
                filterAccounts().map(({name, balance}) => (
                  <BalanceTile accountName={name} balance={balance} key={name} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default withAuth(Home);