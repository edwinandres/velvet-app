import React, { Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {MenuActiveContext} from '../../context';

class MenuItem extends React.Component{  

    static defaultProps = { 
        name: '',
        label: '',
        classIcon: '',
        link: '',
        items: '',
        parent: null,
        activeItems: [],
    };

    static contextType = MenuActiveContext;

    render(){

        return ( 
            <Fragment>
            {Array.isArray(this.props.items) ? (
                <li className="nav-item has-treeview">
                    <Link to={this.props.link} className={this.context.state.activeItems.includes(this.props.name)? "nav-link active" : "nav-link"}>
                        <i className={this.props.classIcon} />
                        <p>{this.props.label}
                            <i className="right fas fa-angle-left" />
                        </p>
                    </Link>
                    <ul className="nav nav-treeview">
                    {this.props.items.map((subItem) => (
                        <MenuItem
                            key={subItem.name}
                            parent = {this.props.name}
                            {...subItem}
                        />
                        ))}
                    </ul>
                </li>
            ) : <li className="nav-item">
                    <Link to={this.props.link} onClick={() => this.context.actions.setActiveItems(this.props.activeItems)}  className={this.context.state.activeItems.includes(this.props.name)? "nav-link active" : "nav-link"}>
                        <i className={this.props.classIcon} />
                        <p>{this.props.label}</p>
                    </Link>
                </li>
            }
        </Fragment>
        );
    }
} 
 
export default withRouter (MenuItem);