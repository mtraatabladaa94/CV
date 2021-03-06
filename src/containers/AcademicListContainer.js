import React, { Component, Fragment, } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/firestore'

/*
    Actions
*/
import {
    filterByCategory,
    openDialogSortBy,
    onClickSortItem,
    getAcademicList,
    addFav,
} from './../state/actions/academicListAction'

import ContentAcademicList from './../components/content/ContentAcademicList'
import PostContainer from './post-container'

class AcademicListContainer extends Component {

    categories = [
        {
            uid: '0',
            name: 'Todo'
        },
        {
            uid: '1',
            name: 'Grado'
        },
        {
            uid: '2',
            name: 'Certificado'
        },
        {
            uid: '3',
            name: 'Curso'
        },
    ];

    itemsForSort = [
        {
            uid: '0',
            label: 'Sin ordenar',
        },
        {
            uid: '1',
            label: 'Nombre de Estudio',
        },
        {
            uid: '2',
            label: 'Favoritos',
        },
    ];

    constructor(props) {
        super(props);

        this.state = {
            postOpenId: '',
        };
    }

    handleDialogSortOpen = () => {
        this.props.openDialogSortBy(true);
    };

    handleDialogSortClose = () => {
        this.props.openDialogSortBy(false);
    };

    handleCategoryClick = (category) => {
        this.props.filterByCategory(category);
    };

    handleListItemClick = (sortBy) => {
        this.props.onClickSortItem(sortBy);
    };

    getAcademicListFilter = (category, sortBy, studies) => {

        if(!studies) return [];

        if((!category || category === '0') && (!sortBy || sortBy === '0')) return studies;

        let studiesFilter = this.getAcademicListByCategory(category, studies);

        studiesFilter = this.getAcademicListSort(sortBy, studiesFilter);

        return studiesFilter;

    };

    getAcademicListByCategory = (category, studies) => {

        if(!category || category === '0') return studies;

        return studies.filter(study => {
            return study.category === category
        })

    };

    getAcademicListSort = (sortBy, studies) => {

        if(!sortBy || sortBy === '0') return studies;

        return studies.sort((prevStudy, nextStudy) => {
            switch(sortBy) {
                case '1': {

                    const prevStudyName = prevStudy.title.toLowerCase();
                    const nextStudyName =  nextStudy.title.toLowerCase();

                    if(prevStudyName < nextStudyName) return -1;

                    if(prevStudyName > nextStudyName) return 1;

                    return 0;

                }
                case '2': {

                    if(prevStudy.cardFavs < nextStudy.favsCount) return -1;

                    if(prevStudy.cardFavs > nextStudy.favsCount) return 1;

                    return 0;

                }
                default: return 0;
            }
        });
        
    };

    setPostOpen = (postId) => {
        this.setState({
            postOpenId: postId,
        });
    };

    onClosePost = () => {
        this.setState({
            postOpenId: undefined,
        });
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

        const { 
            postOpenId,
        } = this.state;

        const studies = list ? list.slice() : [];

        return (
            <Fragment>
                <ContentAcademicList
                    onDialogSortOpen={this.handleDialogSortOpen}
                    onDialogSortClose={this.handleDialogSortClose}
                    onCategoryClick={this.handleCategoryClick}
                    onListItemClick={this.handleListItemClick}
                    stateList={stateList}
                    list={this.getAcademicListFilter(category, itemToSort, studies)}
                    categories={this.categories}
                    categorySelected={category}
                    itemsForSort={this.itemsForSort}
                    itemToSort={itemToSort}
                    isOpenDialogOrderBy={isOpenDialogOrderBy}
                    addFav={addFav}
                    postOpen={this.setPostOpen}
                />
                {postOpenId && (
                    <PostContainer
                        postId={postOpenId}
                        open={true}
                        onClose={this.onClosePost}
                    />
                )}
            </Fragment>
        )

    }

    createFav = (key, value, ipClient) => {
        
        var db = firebase.firestore();

        db.collection('studies').doc(key).collection('favs').add({
            date: new Date(),
            ipClient: ipClient,
            fav: value,
        })
        .then((docRef) => {
            console.log(docRef);
        })
        .catch((error) => {
            console.error('Error: ', error);
        });

    };

    componentDidMount() {

        this.props.getAcademicList()

    }

}

const mapStateToProps = (newState) => {
    
    let { academicList } = newState;
    
    if(!academicList) {
        academicList = {
            state: 0,
            list: [],
            category: '0',
            isOpenDialogOrderBy: false,
            itemToSort: '0',
        };
    }
    
    const { state, list, category, isOpenDialogOrderBy, itemToSort } = academicList;
    
    return {
        stateList: state,
        list,
        category,
        isOpenDialogOrderBy: isOpenDialogOrderBy ? isOpenDialogOrderBy : false,
        itemToSort,
    };

};

const mapDispatchToProps = dispatch => ({

    filterByCategory:       (category)              =>      dispatch(filterByCategory(category)),
    openDialogSortBy:       (isOpen)                =>      dispatch(openDialogSortBy(isOpen)),
    onClickSortItem:        (itemToSort)            =>      dispatch(onClickSortItem(itemToSort)),
    getAcademicList:        ()                      =>      dispatch(getAcademicList()),
    addFav:                 (studyId, IP, value)    =>      dispatch(addFav(studyId, IP, value)),

});

export default connect(mapStateToProps, mapDispatchToProps)(AcademicListContainer);