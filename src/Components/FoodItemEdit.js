import React,{ Component } from 'react';
import { from } from 'rxjs';
import { getUser, getToken } from '../Utils/Common';
import Axios from 'axios';

class FooditemEdit extends Component {

    constructor(props){
        super(props);

        this.state = {
                name: "",
                category: "Coffee",
                brand: "",
                description:"",
                price:0,
                containerType:"Pouch",
                submitError:null,
                formErrors: {
                    name:"",
                    description:"",
                    category:"",
                    brand: "",
                    price:"",
                    containerType: ""
        }
    }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const reqObject = {
            name: this.state.name,
            category: this.state.category,
            brand: this.state.brand,
            description: this.state.description,
            price: this.state.price,
            containerType: this.state.containerType
        }

         Axios.put("http://localhost:3001/foodItem" + this.props.match.params.id, reqObject,{
            headers:{
                "x-auth-token": getToken()
            }
         })

         .then(res => {
            const data = res.data;
            console.log(data);
            this.setState({
                name: data.name,
                category: data.category,
                brand: data.brand,
                description: data.description,
                price: data.price,
                containerType: data.containerType
            
            })
            this.props.history.push("/items")
         })
         .catch(error => {
            this.setState({
                submitError: error.response.data.message
            });
         })
    }

    componentDidMount = () => {
        Axios.get('http://localhost:3001/foodItem/' + this.props.match.params.id)
        .then(res => {
            const data= res.data;

            this.setState({
                name: data.name,
                category: data.category,
                brand: data.brand,
                description: data.description,
                price: data.price,
                containerType: data.containerType
            
            })
        })

        .catch(err => console.log("There is some error : " + err));
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value} = event.target;
        let formErrors = this.state.formErrors;

        switch(name){
            case "name":
                formErrors.name = value.length < 3 ? "Minimum 3 characters are required" : "";
                break;
            case "brand":
                formErrors.brand = value.length < 2 ? "Minimum 2 characters are required" : "";
                break;
            case "description":
                formErrors.description = value.length < 20 ? "Minimum 20 characters are required" : "";
                break;
            case "price":
                formErrors.price = value.length < 0 ? "Price can not be negative !" : "";
                break;
            default:
                    break;
    }
    
    this.setState({ formErrors, [name]: value}, () => { console.log(this.state)});
    }

    render() {
        const{ formErrors } = this.state;

        return(
            <div className="container" style={{ width: "60%"}}>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <Input type= "text" name="name"
                        className={`form-control ${formErrors.name.length > 0 ? "is-invalid" : null}`} id="name"
                        onChange={this.handleChange} 
                        value={this.state.name|| ''}/>
                        {formErrors.name.length >0 && (<span>{formErrors.name}</span>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select name="category" className="form-control" 
                        value={this.state.category || ''}
                         onChange={this.handleChange} id="category">
                            <Option>Coffee</Option>
                            <Option>Dals and Pulses</Option>
                            <Option>Ghee and Oils</Option>
                            <Option>Atta and flours</Option>
                            <Option>Masala and Spices</Option>
                            <Option>Nuts</Option>
                            <Option>Sugar and Salt</Option>
                            <Option>Snacks</Option>
                            <Option>Tea</Option>
                            <Option>Soft Drinks</Option>
                            <Option>Juices</Option>
                            <Option>Noodles and Pasta</Option>
                            <Option>Chocolates, sweets and Jams</Option>
                        </select>
                    </div>
                    <div className="form-group">
                    <label htmlFor="brand">Brand</label>
                    <Input type ="text" name="brand" id="brand"
                    className={`form-control $ {formErrors.brand.length > 0 ? "is-invalid" : null}`}
                    onChange={this.handleChange}
                    value= {this.state.brand || ''}/>
                    {formErrors.brand.length > 0 && (<span>{formErrors.brand}</span>)}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id= "description"
                    className={`form-control $ {formErrors.description.length > 0 ? "is-invalid" : null}`}
                    onChange={this.handleChange} 
                     value={this.state.description || ''}
                     rows="3"> </textarea>
                    {formErrors.description.length> 0 && (<span>{formErrors.description}</span>)}

                </div>
                <div className="form-group">
                <label htmlFor="price">Price</label>
                <Input type="number" name="price" id="price"
                className={`form-control $ {formErrors.price.length > 0 ? "is-invalid" : null}`}
                onChange={this.handleChange}
                value={this.state.price || ''} />
                 {formErrors.price.length> 0 && (<span>{formErrors.price}</span>)}
                </div>

                <div className="form-group">
                <label htmlFor="containerType">container Type</label>
                <select name ="containerType" 
                className="form-control" 
                onChange={this.handleChange} 
                id="containerType"
                value={this.state.containerType || ''}>
                    <Option>Pouch</Option>
                    <Option>Bottle</Option>
                    <Option>Can</Option>
                    <Option>Cartoon</Option>
                </select>
                </div>
                {this.state.submitError && <><div className="alert alert-danger" role="alert">{this.state.submitError}</div><br/></>}
                <button type="submit" className="btn btn-primary">Submit</button>

        </form>
        </div>
    )
}
}

    export default FooditemEdit;

