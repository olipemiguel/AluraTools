"use strict";
class Create{
  constructor(nome,peso,altura,gordura){
    this.nome = nome;
    this.peso = peso;
    this.altura = altura;
    this.gordura = gordura;
  }

  checkInput(){
    const nome = document.querySelector("#nome").value;
    const peso = document.querySelector("#peso").value;
    const altura = document.querySelector("#altura").value;
    const gordura = document.querySelector("#gordura").value;
    const values = new Array(`${parseFloat(nome)}`,`${parseFloat(peso)}`,`${parseFloat(altura)}`,`${parseFloat(gordura)}`);
    const returnValue = new Array();
    values.map((e,i)=>{
      if(i==0){
        if(e=="NaN"){
          returnValue.push(nome)
        }
      }else if(i==1){
        if(e!="NaN"){
          returnValue.push(e)
        }
      }else if(i==2){
        if(e!="NaN"){
          returnValue.push(e)
        }
      }else if(i==3){
        if(e!="NaN"){
          returnValue.push(e)
        }
      }
    })
    if(returnValue.length==4){
      return returnValue;
    }else{
      return false;
    }
  }
  table(returnValue){
    this.returnValue = returnValue;
    const table = [...document.querySelectorAll(".paciente")];
    const valuesClass = new Array("info-nome","info-peso","info-altura","info-gordura");
    const tabela = document.querySelector("#tabela-pacientes");
    const tr = document.createElement("tr");
    tr.setAttribute("class","paciente");
    returnValue.forEach((element,index) => {
      const td = document.createElement("td");
      td.setAttribute("class",valuesClass[index]);
      td.innerText = element;
      tr.appendChild(td);
    });
    const td = document.createElement("td");
    td.setAttribute("class","info-imc");
    td.innerText = parseInt(this.returnValue[1] / (this.returnValue[2]*this.returnValue[2] ));
    tr.appendChild(td);
    tabela.appendChild(tr);
  };
  error(){
    alert("Dados invalidos!");
  }
}
class Filter extends Create{
  constructor(nomeClient){
    super();
    this.nomeClient = nomeClient;
  }
  search(){
    console.log("Searching");
    const tabelaFilter = [...document.querySelectorAll(".info-nome")];
    tabelaFilter.filter((element)=>{
      if(element.textContent==this.nomeClient){
        console.log("Achamos");
      }else{
        element.parentElement.style.display = "none";
      }
    })
  }
  display(){
    const tabelaFilter = [...document.querySelectorAll(".info-nome")];
    tabelaFilter.map((e)=>{
      e.parentElement.style.display = "table-row;";
    })
  }
}
const adicionar = document.querySelector("#adicionar-paciente");
const filterBtn = document.querySelector("#buscar-pacientes");
const createObj = new Create();
filterBtn.addEventListener("click",()=>{
  const filterInput = document.querySelector("#filtrar-tabela");
  const FilterObj = new Filter(filterInput.value);
  FilterObj.search();
})
adicionar.addEventListener("click",(event)=>{
  event.preventDefault();
  const Inputs = createObj.checkInput();
  if(Inputs){
    createObj.table(Inputs);
  }else{
    createObj.error();
  }
})