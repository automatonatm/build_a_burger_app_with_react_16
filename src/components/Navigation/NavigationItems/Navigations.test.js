import  React from  'react'
import {configure, shallow}  from 'enzyme'

import Adapter from 'enzyme-adapter-react-16'


import  NavigationItems from './NavigationItems'

import NavigationItem from '../NavigationItem/NavigationItem'

configure({adapter: new Adapter()})

describe('<NavigationItems />', () => {
    let wrapper
    beforeEach(() => {
       wrapper = shallow(<NavigationItems/>)
    })
    it('it should render to two <NavigationItems /> elements if not authenticated', () => {
      //const wrapper = shallow(<NavigationItems/>)
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    it('it should render to three <NavigationItems /> elements if  authenticated', () => {
         //wrapper = shallow(<NavigationItems isAuth />)
        wrapper.setProps({isAuth: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    it('should render logout Navigation if authenticated', () => {
        wrapper.setProps({isAuth: true})
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
    })
})