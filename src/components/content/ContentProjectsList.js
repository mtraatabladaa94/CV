/*
    Portafolio Personal
*/

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import MyCardMedia from './../theme/MyMediaCard'
import ContentCategoryFilter from './ContentCategoryFilter'
import SimpleDialog from './../theme/SimpleDialog'
import ContentLoading from './ContentLoading'
import NotFound from './../theme/NotFound'

import Avatar from '@material-ui/core/Avatar'

const styles = {
    containerList: {
        paddingTop: 24,
        paddingBottom: 24,
        minHeight: '425px',
    },
};

const ContentProjectList = (props) => {

    const {
        classes,
        stateList,
        list,
        categories,
        categorySelected,
        isOpenDialogOrderBy,
        itemsForSort,
        onDialogSortOpen,
        onDialogSortClose,
        onCategoryClick,
        onListItemClick,
        addFav,
    } = props;

    return (

        <div
            className={'contentAcademicListSection'}
        >

            <ContentCategoryFilter
                categories={ categories }
                active={ categorySelected ? categorySelected : '0' }
                handleSortClick={ onDialogSortOpen }
                handleCategoryClick={ onCategoryClick }
            />

            <SimpleDialog
                title={ 'Ordenar por...' }
                list={ itemsForSort }
                open={ isOpenDialogOrderBy }
                onClose={ onDialogSortClose }
                onListItemClick={ onListItemClick }
            />

            <Grid
                className={classes.containerList}
                container
                spacing={8}
                justify={'center'}
            >
                {renderProjectList(list, stateList, addFav)}
            </Grid>

        </div>

    );

}

ContentProjectList.propTypes = {
    classes: PropTypes.object.isRequired,
}

const renderProjectList = (list, stateList, addFav) => {
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
                                    key={               item.uid            }
                                    avatar={
                                        <Avatar
                                            src={item.avatarURL}
                                        />
                                    }
                                    photoURL={          item.photoURL       }
                                    photoDescription={  item.title          }
                                    cardTitle={         item.title          }
                                    cardSubtitle={      item.data.projectCompany          }
                                    cardFavs={          item.favsCount      }
                                    onClickFav={() => addFav(item.uid, true, '10.1.184.47')}
                                    cardShares={        item.sharesCount    }
                                />
                            </Grid>

                        )

                    })
                :
                    <NotFound
                        title={'Por ahora no hay datos :('}
                        description={'Al parecer aún no se ha ingresado proyectos al portafolio. Pero pronto los añadiremos.'}
                    />
            );
            break;
        case 2:
            renderList = (
                <NotFound
                    title={'Ha ocurrido un error :('}
                    description={'Lo sentimos actualmente estamos teniendo problemas al obtener los datos. Estamos trabajando en ello.'}
                />
            );
            break;
        default:
            break;
    }
    return (renderList);
};

export default withStyles(styles)(ContentProjectList)