import { useState } from "react";



function App() {

  const [items, setItems] = useState([])
  //const [itemscount, setItemcounts] = useState(0 )
  const itemsCount= items.length;
  
  function handleAddItem(item){
    setItems((items)=> [...items, item]);}

    function handleDeleteItem(id){
     setItems(items => items.filter(item => item.id !== id)) 
    }
    function handleUpdateItem(id){
      setItems(items=> items.map(item => item.id == id ? {...item, completed: !item.completed} : item))
    }
    function handleclearlist(){
     
      if(items.length!=0){
         const onay= window.confirm("Listedeki tüm ürünleri silmek istediğinziden emin misiniz?");
        if(onay){
          setItems([]);
    }}}

  return (
    <div className="app">
      <Header />
      <Form onAddItem={handleAddItem} onclearlist={handleclearlist}/>
      <List items={items} onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem}/>
      <Summary items={items}/>
    </div>
  );
}


function Header() {
  return <h1>Shopping List</h1>;
}

function Form({onAddItem, onclearlist}) {
  const [title , setTitle] = useState("");
  const [quantity , setQuantity] = useState(1)
  

  


  function handleFormSubmit(e){
    e.preventDefault();
    if(title){
    const item= {id: Date.now(), title, quantity, completed: false};
    console.log(item);

    onAddItem(item);

    setTitle("");
    setQuantity(1);
    }
  }

  return (
    <form className="form" onSubmit={handleFormSubmit}>
      <input type="text" placeholder="Ürün adı giriniz" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
       {Array.from({length:10}, (v,i) => i+1 )
       .map(num =>  <option value={num} key={num}>{num}</option>  )
       }

      </select>
      <button type="submit">Ekle</button>
      <button type="button" onClick={onclearlist}>Temizle</button>
    </form>
  );
}

function List({items, onDeleteItem , onUpdateItem}) {
  return (
    <>
    {items.length>0 ? (<div className="list">
      <ul>
        {items.map((item, index) => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onUpdateItem={onUpdateItem}/>
        ))}
      </ul>
    </div>): 
    <p className="list">Sepetinizde ürün yok </p>
    }
    </>
  );
}

function Item({ item , onDeleteItem, onUpdateItem}) {
  return (
    <li>
      <input type="checkbox" checked={item.completed} onChange={() => onUpdateItem(item.id)}></input>
      <span style={item.completed ? {textDecoration:"line-through"}: {}}>{item.quantity} {item.title}</span>
      <button onClick={() => onDeleteItem(item.id)}>X</button>
    </li>
  );
}

function Summary({items}) {
  if(items.length==0){
    return (
        <footer className="summary">Alışveriş Listenizi Hazırlamaya Başlayabilirsiniz</footer>
    );

  }
  const itemsCount= items.length;
  const complateditemCounts=items.filter(item => item.completed).length
  return (
    <footer className="summary">
      {itemsCount==complateditemCounts ? <p>Alışverişi tamamladınız</p>: 
      <p>   Alışveriş sepetinizde {itemsCount} üründen {complateditemCounts}  vardır</p>}
   </footer>
  );
}

export default App;