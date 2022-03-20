import React from 'react'
import MenuItem from './common/MenuItem'
import {MenuActiveContext} from '../context';
import  { itemsMenuVelvet} from '../helpers/menuHelper';



class Menu extends React.Component 
{
  
  constructor(props) {
    super(props);
    this.state = { activeItems: ['home']}
    this.setActiveItems =  this.setActiveItems.bind(this)
  
  }

  setActiveItems(activeItems){
    let activeItemsArray = activeItems.split("/");
    let closedSubmenusAux = activeItemsArray.length === 0? true: false;
    this.setState({activeItems: activeItemsArray, closedSubmenus: closedSubmenusAux});
  }

  render() 
  {
    const value = {
      state: this.state,
      actions: {
        setActiveItems: this.setActiveItems
      }
    };

    return (
      
      // <aside className="main-sidebar sidebar-dark-primary elevation-4" >
      <aside className="main-sidebar  elevation-4" style={{color:"#09202E", backgroundColor:"#09202E"}}>
        <a href="#!" className="brand-link">
          <img src="dist/img/velvetLogo.png" alt="AdminLTE Logo" className="brand-image" />
          <span className="brand-text font-weight-light text-white"><strong>Velvet</strong></span>
        </a>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="dist/img/velvetLogo.png" className="img-circle elevation-2" alt="User " />
            </div>
            <div className="info">
              <a href="#!" className="d-block text-white">Usuario Default</a>
            </div>
          </div>
          <MenuActiveContext.Provider value={value}>
          <nav className="mt-2">
            
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
              {itemsMenuVelvet.map((menuItem, index) => (
                <MenuItem
                  key={`${menuItem.name}${index}`}
                  {...menuItem}
                />
              ))}
            </ul>
          </nav>
          </MenuActiveContext.Provider>
        </div>
      </aside>
    );
  }
}

export default Menu;
