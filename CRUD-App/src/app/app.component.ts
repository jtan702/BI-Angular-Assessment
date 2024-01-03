import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet} from '@angular/router';
import { Transaction } from '../models/transaction';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CRUD-App';
  //vars to add new transaction
  addAmountValue:number = 0; 
  addTransactionDate:string  = '';
  addDescriptionValue:string = '';
  //vars to edit existing transaction
  editTransaction:Transaction = {id:'',amount:0,date:'',year:0,month:0,description:''};
  editAmountValue:number = 0; 
  editTransactionDate:string  = '';
  editDescriptionValue:string = '';
  //vars to filter transactions
  filterYear?:number;
  filterMonth?:number;
  //controls transactions displayed
  transactions:Transaction[] = [{id: 'sample1', amount: 500, date: '2023-12-13T19:51',year:2023, month:12, description: 'test'}];
  filteredTransactions:Transaction[]=[];
  diplayedTransactions:Transaction[]=[{id: 'sample1', amount: 500, date: '2023-12-13T19:51',year:2023, month:12, description: 'test'}];

  updateDisplayTransactions(){
    this.diplayedTransactions = this.transactions;
    this.filterYear = 0;
    this.filterMonth = 0;
  }
  
  
  addItem(){
    console.log("Adding item");
    if (this.addAmountValue !== null && this.addTransactionDate !== "" && this.addDescriptionValue !== ""){
      let newTransaction:Transaction = {
        id: Date()+this.addDescriptionValue,
        amount: this.addAmountValue,
        date: this.addTransactionDate,
        year: Number(this.addTransactionDate.slice(0,4)),
        month: Number(this.addTransactionDate.slice(5,7)),
        description: this.addDescriptionValue
        }
        this.transactions.push(newTransaction);
        this.addAmountValue = 0;
        this.addDescriptionValue = "";
        this.updateDisplayTransactions();
        console.log("Item added");
        console.log(newTransaction)
      }
    }

  SearchItem() {
    this.filteredTransactions = this.transactions;
    if (this.filterYear !== 0) {
      this.filteredTransactions = this.filteredTransactions.filter(t => t.year == this.filterYear)
    }
    if (this.filterMonth !== 0) {
      this.filteredTransactions = this.filteredTransactions.filter(t => t.month == this.filterMonth)
    }
    this.diplayedTransactions = this.filteredTransactions;
    this.filteredTransactions =[];
  }

  deleteItem(id:string) {
    this.transactions = this.transactions.filter(t => t.id !== id )
    this.updateDisplayTransactions();
  }

  openAddModal() {
    const modal = document.getElementById("addModal");
    if (modal !== null) {
      modal.style.display='block';
    }
  }

  openEditModal(transaction:Transaction) {
    const modal = document.getElementById("editModal");
    if (modal !== null) {
      modal.style.display='block';
      this.editTransaction = transaction;
    }
  }

  closeEditModal() {
    const modal = document.getElementById("editModal");
    if (modal !== null) {
      modal.style.display='none';
    }
  }

  closeAddModal() {
    const modal = document.getElementById("addModal");
    if (modal !== null) {
      modal.style.display='none';
    }
  }

  editItem(){
    console.log("Edit item");
    if (this.editAmountValue !== null && this.editTransactionDate !== "" && this.editDescriptionValue !== "") {
      this.editTransaction.amount! = this.editAmountValue;
      this.editTransaction.date! = this.editTransactionDate;
      this.editTransaction.year = Number(this.addTransactionDate.slice(0,4)),
      this.editTransaction.month = Number(this.addTransactionDate.slice(5,7)),
      this.editTransaction.description! = this.editDescriptionValue;
      this.editAmountValue = 0;
      this.editDescriptionValue = "";
      console.log("Item edited");
      this.closeEditModal();
      }
    }
}