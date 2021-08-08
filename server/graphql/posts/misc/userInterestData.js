// This is a place where you can manage data is user documents that affects what posts the user might be intrested in
// ex. frequently viewed tags, posts from followed users, etc.

// its late and im struggling, please send help, my eyes are in pain

const UserIntrestDataManager = {
    viewedTags: function(current_tags, viewed_tags) {
        let finalTags = [];

        // copy the current tags into final tags
        for (let i = 0; i < current_tags.length; i++) {
            finalTags.push({
                tag: current_tags[i].tag,
                interactions: current_tags[i].interactions,
                lastInteraction: current_tags[i].lastInteraction,
                manuallyAdded: false,
            });
        }

        // update interactions based on elpased time
        finalTags = this.checkTagTimestamps(finalTags);

        // merge the two arrays
        for (let i = 0; i < viewed_tags.length; i++) {
            const currentTagIndex = this.contains(finalTags, viewed_tags[i]);

            if (currentTagIndex !== -1) {
                // limit interactions to 5000
                if (finalTags[currentTagIndex].interactions < 5000) {
                    finalTags[currentTagIndex].interactions++;
                } 

                // set last interaction time even if they have reached the int limit
                finalTags[currentTagIndex].lastInteraction = Date.now();
            } else { 
                finalTags.push({
                    tag: viewed_tags[i],
                    interactions: 1,
                    lastInteraction: Date.now(),
                    manuallyAdded: false,
                });
            }
        }

        // finally sort the array to make the aggregation queries easier to handle
        finalTags.sort((a, b) => b.interactions - a.interactions);

        return finalTags;
    },

    // will check and reduce any tag interactions that havent been interacted with in a while
    checkTagTimestamps(current_tags) {
        let finalTags = [];
        
        // copy the current tags into final tags
        for (let i = 0; i < current_tags.length; i++) {
            finalTags.push({
                tag: current_tags[i].tag,
                interactions: current_tags[i].interactions,
                lastInteraction: current_tags[i].lastInteraction,
                manuallyAdded: current_tags[i].manuallyAdded, 
            });
        }

        for (let i = 0; i < finalTags.length; i++) {
            if (!finalTags[i].manuallyAdded) {
                const currentTime = Date.now();
                const elapsedMilliseconds = currentTime - finalTags[i].lastInteraction;
                
                const elapsedDays = elapsedMilliseconds/86400000;
                
                if (elapsedDays > 365) {
                    finalTags[i] = 0;
                } else if (elapsedDays >= 120) {
                    finalTags[i].interactions -= 60;
                } else if (elapsedDays >= 60) {
                    finalTags[i].interactions -= 30;
                } else if (elapsedDays >= 28) {
                    finalTags[i].interactions -= 15;
                } else if (elapsedDays >= 21) {
                    finalTags[i].interactions -= 10;
                } else if (elapsedDays >= 14) {
                    finalTags[i].interactions -= 5;
                } else if (elapsedDays >= 7) {
                    finalTags[i].interactions -= 1;
                } 

                if (finalTags[i].interactions < 1) {
                    finalTags.splice(i, 1);
                    i--;
                }
            }
        }

        return finalTags;
    },

    // this returns an array with only the tags you want to add, youll need to concat the current tags
    // onto the end of this from wherever it gets called
    manuallyAddTags: function(tagsToAdd) {
        let finalTags = [];

        for (let i = 0; i < tagsToAdd.length; i++) {
            finalTags.push({
                tag: tagsToAdd[i],
                interactions: 10000,
                lastInteraction: Date.now(),
                manuallyAdded: true,
            });
        }
    },

    // returns -1 if the array does not contain the tag
    contains: function(tagArr, tagName) {
        for (let i = 0; i < tagArr.length; i++) {
            if (tagArr[i].tag === tagName) {
                return i;
            }
        }
        return -1;
    }
};

export default UserIntrestDataManager;