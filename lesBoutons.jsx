import { Button, Touchable, TouchableOpacity, View } from 'react-native';

export const LesBoutons = (props) => {
return (
<View style={props.lestyle.containerligne}>
<Button
    title="ajouter"
    color="#ff0000"
    accessibilityLabel="Learn more about this purple button"
    onPress={props.ajouter}
/>


</View>
);} 

export const LeTextInput = (props) =>{ 
    return (  
<View style={props.lestyle.containerligne}>
<TextInput
        style={styles.input}
        value={props.setsaisieaisie}
        onChangeText={(value) => setsaisie(value)}
        placeholder="Ajoutez prod"
/>
</View>
);}