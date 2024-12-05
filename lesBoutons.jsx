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

<TouchableOpacity
title='supprimer'
color="#ff0000"
accessibilityLabel='supprimer'
onPress={props.supprimer}/>
</View>
);}