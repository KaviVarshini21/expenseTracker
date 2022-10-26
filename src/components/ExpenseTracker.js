import React,{useState,useEffect} from "react";
import Expense from "./Expense";
import TranscationHistory from "./TransactionHistory";
import TranscationForm from "./TransactionForm";
// import { uniqueId } from "../utils";

// Aggregator componenet

const transactionData=[
 
];
function ExpenseTracker(){
    const [income,setIncome]=useState(0);
    const [expense,setExpense]=useState(0);
    const [transactions,setTransactions]=useState(transactionData);
    const saveState = () => {
        localStorage.setItem('expenseTrackerState',
        JSON.stringify(transactions));

    }

    const calculateExpenses = () => {
        let income=0, expense =0;
        transactions.forEach((data) => {
            if (data.type === 'income'){
                income+= data.amount;
            }
            else if (data.type === 'expense'){
                expense+= data.amount;
            }

        });
        saveState();
        setIncome(income);
        setExpense(expense);
    }

    const handleAddNewTransaction = item => {
        let newTransactions = [...transactions,item];
        setTransactions(newTransactions);
    }

    const handleDeleteTransaction= id => {
        const newTransactions = transactions.filter((item) => item.id !== id);
        setTransactions(newTransactions);

    }
    useEffect(() => {
        let localState = JSON.parse(localStorage.getItem('expenseTrackerState'));
        if (localState){
            setTransactions(localState);
        }
        else{
            calculateExpenses();
        }
        calculateExpenses();
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        
        calculateExpenses();
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transactions]);



    return(
        <div>
            <h1>Expense Tracker</h1>
            <Expense income={income} expense={expense}/>
            <TranscationHistory transactions={transactions} onDeleteTransaction={handleDeleteTransaction} />
            <TranscationForm onNewTransaction={handleAddNewTransaction} />
        </div>
    )
};
export default ExpenseTracker;