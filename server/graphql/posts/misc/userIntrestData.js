// This is a place where you can manage data is user documents that affects what posts the user might be intrested in
// ex. frequently viewed tags, posts from followed users, etc.

import { visitWithTypeInfo } from "graphql";

// its late and im struggling, please send help, my eyes are in pain

const UserIntrestDataManager = {
    viewedTags: function(current_tags, viewed_tags) {
        let finalTags = [];

        // copy the current tags into final tags
        for (let i = 0; i < current_tags.length; i++) {
            finalTags.push({
                tag: current_tags[i].tag,
                interactions: current_tags[i].interactions,
            });
        }

        // merge the two arrays
        for (let i = 0; i < viewed_tags.length; i++) {
            const currentTagIndex = this.contains(finalTags, viewed_tags[i]);

            if (currentTagIndex !== -1) {
                // limit interactions to 5000
                if (finalTags[currentTagIndex].interactions < 5000) {
                    finalTags[currentTagIndex].interactions++;
                } 
            } else { 
                finalTags.push({
                    tag: viewed_tags[i],
                    interactions: 1,
                });
            }
        }

        // finally sort the array and remove excess elements(limit it to 15 tags)
        finalTags.sort((a, b) => b.interactions - a.interactions);

        if (finalTags.length > 15) {
            finalTags.pop();
        }

        return finalTags;
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