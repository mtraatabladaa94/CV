import React, { Component } from 'react'
import { connect } from 'react-redux'

/*
    Actions
*/
import {
    filterByCategory,
    openDialogSortBy,
    onClickSortItem,
    getProjectList,
    addFav,
} from './../state/actions/projectListAction'

import ContentProjectList from './../components/content/ContentProjectsList'

class ProjectListContainer extends Component {

    categories = [
        {
            uid: '0',
            name: 'Todo'
        },
        {
            uid: '1',
            name: 'Personal'
        },
        {
            uid: '2',
            name: 'Empresarial'
        },
    ];

    itemsBySort = [
        {
            uid: '0',
            label: 'Sin ordenar',
        },
        {
            uid: '1',
            label: 'Nombres de proyecto',
        },
        {
            uid: '2',
            label: 'Favoritos',
        },
    ];

    handleDialogSortOpen = () => {
        this.props.openDialogSortBy(true);
    };

    handleDialogSortClose = () => {
        this.props.openDialogSortBy(false);
    };

    handleCategoryClick = (category) => {
        this.props.filterByCategory(category);
    };

    handleListItemClick = (orderBy) => {
        this.props.onClickSortItem(orderBy);
    };

    render() {

        const {
            stateList,
            list,
            category,
            isOpenDialogOrderBy,
            itemToSort,
            addFav,
        } = this.props;

        return (
            <ContentProjectList
                onDialogSortOpen={this.handleDialogSortOpen}
                onDialogSortClose={this.handleDialogSortClose}
                onCategoryClick={this.handleCategoryClick}
                onListItemClick={this.handleListItemClick}
                stateList={stateList}
                list={list}
                categories={this.categories}
                categorySelected={category}
                itemsForSort={this.itemsForSort}
                itemToSort={itemToSort}
                isOpenDialogOrderBy={isOpenDialogOrderBy}
                addFav={addFav}
            />
        )
    }

    componentDidMount() {

        this.props.getProjectList()

    }

    componentWillUpdate() {

        const { category } = this.props;

        if(category) {
            this.props.getProjectList()
        }

    }

}

const mapStateToProps = (newState, props) => {
    
    var { projectList } = newState;
    
    if(!projectList) {
        projectList = {
            state: 0,
            list: [],
            category: '0',
            isOpenDialogOrderBy: false,
            itemToSort: '0',
        };
    }
    
    const { state, list, category, isOpenDialogOrderBy, itemToSort } = projectList;
    
    return {
        stateList: state,
        list,
        category,
        isOpenDialogOrderBy: isOpenDialogOrderBy ? isOpenDialogOrderBy : false,
        itemToSort,
    };

};

const mapDispatchToProps = dispatch => ({

    filterByCategory:   (category)                          => dispatch(filterByCategory(category)),
    openDialogSortBy:   (isOpen)                            => dispatch(openDialogSortBy(isOpen)),
    onClickSortItem:    (itemToSort)                        => dispatch(onClickSortItem(itemToSort)),
    getProjectList:     (category = '', unsuscribe = false) => dispatch(getProjectList(category, unsuscribe)),
    addFav:             (studyId, IP, value)                => dispatch(addFav(studyId, IP, value)),

});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer)