import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ContactScreen from '../ContactsScreen';
import Contact from '../SubContactScreens/Contact';
import AddContactScreen from '../SubContactScreens/AddContactScreen';

import * as Storage from '../../components/Storage';


describe("ContactScreen Testing", () => {
    
    it('renders the CalendarScreen', async () => {
        const tree = renderer.create(<ContactScreen />).toJSON();
        expect(tree).toMatchSnapshot();
      });

    it('render the Contact Components', async () => {
        let item = {
            name: 'Andreas',
            email: 'andi@andi.com',
            number: 41403912
        }
        const tree = renderer.create(<Contact item={item} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('should change state in sections, and be equal to', () => {
        let contactComponent = renderer.create(<ContactScreen />).getInstance()
        contactComponent.addContact('Jørgen','Jorgensta@gmail.com',41403910);

        let section = {
            title: 'J',
            data: [{
              name: 'Jørgen',
              email: 'Jorgensta@gmail.com',
              number: 41403910
            }],
          }
        expect(contactComponent.state.sections).toEqual([section])

    })

    it('should show set visible Modal, and match snapshot after invoke', () => {
        let contactComponent = renderer.create(<ContactScreen />)
        contactComponent.getInstance().setModalVisible(true)
        expect(contactComponent.getInstance().state.modalVisible).toEqual(true)
        const afterTree = contactComponent.toJSON();
        expect(afterTree).toMatchSnapshot();

    })
})

describe("AddContact screen testing", () => {
    it('renders the addContactScreen correctly', async () => {
        const tree = renderer.create(<AddContactScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it("should update addContact state name correctly", async () => {
        const addContactComponent = renderer.create(<AddContactScreen />).getInstance();
        addContactComponent.handleNameChange('jørgen');
        expect(addContactComponent.state.name).toEqual('jørgen')
    })

    it("should update addContact state Email correctly", async () => {
        const addContactComponent = renderer.create(<AddContactScreen />).getInstance();
        addContactComponent.handleEmailChange('jorg@jorg.com');
        expect(addContactComponent.state.email).toEqual('jorg@jorg.com')
    })

    it("should update addContact state Phonecorrectly", async () => {
        const addContactComponent = renderer.create(<AddContactScreen />).getInstance();
        addContactComponent.handleNumberChange('41403910');
        expect(addContactComponent.state.number).toEqual('41403910')
    })


    it('AddContact method should be called' , async () => {
        const addContact = jest.fn();

        let testState = {
            name: 'Jørgen',
            email: 'Jorgensta@gmail.com',
            number: 41403910
        }
        
        const addContactScreen = renderer.create(<AddContactScreen state={testState} addContact={addContact} />).getInstance();

        addContactScreen._submit()

        expect(addContact).toHaveBeenCalled();
    })

})