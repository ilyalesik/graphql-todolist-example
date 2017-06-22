import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeLanguage } from '../../store'
import styled from 'styled-components'

const ChangeLanguage = styled.div`
    flex: 1;
`


class ChangeLanguageComponent extends PureComponent {
    handleChange = () => {
        this.props.changeLanguage()
    };
    render() {
        return <ChangeLanguage>
            <button onClick={this.handleChange}>{this.props.language}</button>
        </ChangeLanguage>
    }
}

const mapStateToProps = ({ intl: {locale} }) => ({ language: locale })

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguage: bindActionCreators(changeLanguage, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeLanguageComponent)