import {useState} from "react"

function AddProductModal() {

  const [display, setDisplay] = useState(false)
  
  function handleClick(){
    console.log("handle modal open")
    setDisplay(!display)
  }

  return (
    <div>
        <button onClick={handleClick}>
            Add a new product
        </button>
        { display==true && 
        <div>
          <i>
              This will be shown if button clicked
              Probably a save button within it
          </i>
          <form>
            <label>product_name</label>
            <input type="text" name="product_name" value=""/>
            <label>scrum_master</label>
            <input type="text" name="scrum_master" value=""/>
            <label>product_owner</label>
            <input type="text"name="product_owner" value=""/>
            <label>developers</label>
            <input type="text" name="developers" value=""/>
            <label>start_date</label>
            <input type="text" name="start_date" value=""/>
            <label>methodology</label>
            <input type="text" name="methodology" value=""/>
            <input type="submit" name="save" value="save"/>
          </form>
        </div>
        }

    </div>
  );
}

export default AddProductModal;
