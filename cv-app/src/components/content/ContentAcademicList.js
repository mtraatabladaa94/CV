/*
    Información Académica
*/

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import firebase from 'firebase'
import 'firebase/firestore'

import MyCardMedia from './../theme/MyMediaCard'
import ContentCategoryFilter from './ContentCategoryFilter'
import SimpleDialog from './../theme/SimpleDialog'
import ContentLoading from './ContentLoading'
import NotFound from './../theme/NotFound'

/*
    Accions
*/
import { 
    setLoadingAcademicList,
    setAcademicList,
    setErrorAcademicList,
    filterByCategory,
    openDialogSortBy,
    onClickSortItem,
} from './../../state/actions/academicListAction'

const styles = {
    containerList: {
        padding: 24,
        minHeight: 400,
    },
};

export class ContentAcademicList extends Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    categories = [
        {
            uid: '0',
            name: 'Todos'
        },
        {
            uid: '1',
            name: 'Grado'
        },
        {
            uid: '2',
            name: 'Certificados'
        },
        {
            uid: '3',
            name: 'Cursos'
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

        const { classes, stateList, list, category, isOpenDialogOrderBy, itemsBySort } = this.props;

        return (

            <div
                className={'contentAcademicListSection'}
            >

                <ContentCategoryFilter
                    categories={this.categories}
                    active={category ? category : '0'}
                    handleSortClick={this.handleDialogSortOpen}
                    handleCategoryClick={this.handleCategoryClick}
                />

                <SimpleDialog
                    title={'Ordenar por...'}
                    list={this.itemsBySort}
                    open={isOpenDialogOrderBy}
                    onClose={this.handleDialogSortClose}
                    onListItemClick={this.handleListItemClick}
                />

                <Grid className={classes.containerList} container spacing={16} justify={'center'}>
                    {this.renderAcademicList(list, stateList)}
                </Grid>

            </div>

        );

    };

    componentDidMount() {

        this.getAcademicList();

    }

    renderAcademicList = (list, stateList) => {
        var renderList;
        switch (stateList) {
            case 0:
                renderList = (
                    <ContentLoading />
                );
                break;
            case 1:
                renderList = (
                    list && list.length > 0 ?
                        list.map((item) => {

                            return (
                                <Grid
                                    key={item.uid}
                                    item
                                >
                                    <MyCardMedia
                                        key={item.uid}
                                        photoURL={item.photoURL}
                                        photoDescription={item.photoURL}
                                        cardTitle={item.cardTitle}
                                        cardDescription={item.cardDescription}
                                    />
                                </Grid>

                            )

                        })
                    :
                        <NotFound
                            title={'Por ahora no hay datos :('}
                            description={'Al parecer aún no se ha ingresado la información académica. Pero pronto la añadiremos.'}
                        />
                );
                break;
            case 2:
                renderList = (
                    <NotFound
                        title={'Ha ocurrido un error :('}
                        description={'Lo sentimos actualmente estamos teniendo problemas. Estamos trabajando en ello.'}
                    />
                );
                break;
            default:
                break;
        }
        return (renderList);
    };

    getAcademicList = () => {

        var db = firebase.firestore();

        var studies = [];

        var query = db.collection('studies');

        /*if(this.state.category){
            if(this.state.category === '0') {
                query.where('category', '==', this.state.category);
            }
        }*/

        query.onSnapshot((snapshot) => {

            this.props.setLoadingAcademicList();

            var counter = 0;

            snapshot.docChanges.forEach((change) => {

                const { doc } = change;

                studies[counter] = {
                    uid: doc.id,
                    photoURL: doc.data().photoURL,
                    photoDescription: doc.data().name,
                    cardTitle: doc.data().name,
                    cardDescription: doc.data().description,
                };

                counter++;

            });

            this.upgradeStudies(studies);

        });

    };

    upgradeStudies = (studies) => {
        this.props.setAcademicList(studies);
    };

}

const mapStateToProps = (newState, props) => {
    
    var { academicList } = newState;
    
    console.log(academicList);

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
    setLoadingAcademicList: () => dispatch(setLoadingAcademicList()),
    setAcademicList: (list) => dispatch(setAcademicList(list)),
    setErrorAcademicList: () => dispatch(setErrorAcademicList()),
    filterByCategory: (category) => dispatch(filterByCategory(category)),
    openDialogSortBy: (isOpen) => dispatch(openDialogSortBy(isOpen)),
    onClickSortItem: (itemToSort) => dispatch(onClickSortItem(itemToSort)),
});

const ContentAcademicListWithStyles = withStyles(styles)(ContentAcademicList);

export default connect(mapStateToProps, mapDispatchToProps)(ContentAcademicListWithStyles);