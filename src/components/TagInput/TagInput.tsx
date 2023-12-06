import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TagInputProps{
  onAddTag: () => void
}
const TagInput:React.FC<TagInputProps> = ({ onAddTag }) => {
  const [tagInput, setTagInput] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const handleTextChange = (text:string) => {
    setTagInput(text);
  };

  const handleKeyPress = (key:any) => {
    if (key === ' ' && tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (index:any) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const renderTags = () => {
    return tags.map((tag, index) => (
      <TouchableOpacity key={index} onPress={() => removeTag(index)}>
        <Text style={styles.tag}>{tag}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.tagContainer}>{renderTags()}</View>
      <TextInput
        value={tagInput}
        style={styles.input}
        onChangeText={handleTextChange}
        onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key)}
        placeholder="Type and press space to add a tag"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
  },
  input: {
    height: 40,
    fontSize: 16,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    backgroundColor: 'lightgray',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
});

export default TagInput;
