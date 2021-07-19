tagListFile = open('./tags.txt', 'r')
tagList = tagListFile.readlines()
tagListFile.close()

print("Type SAVE to save the tags you added to the file!\n")

isGoing = True

while isGoing:
    tagToAdd = input("Tag > ")

    if (tagToAdd == 'SAVE'):
        isGoing = False
    else:
        tagList.append(tagToAdd.strip().lower() + '\n')
        tagList.sort()
        print('Added ' + tagToAdd.strip().lower() + " to the file.")
    


fileToWrite = open('./tags.txt', 'w')
fileToWrite.writelines(tagList)
fileToWrite.close()
