import Photo from '../db/photoModel.js';
import User from '../db/userModel.js';

const getPhotosOfUser = async (userId) => {

    try {
        const photos = await Photo.find({ user_id: userId })
            .populate({
                path: 'comments.user_id',
                model: User,
                select: '_id first_name last_name'
            })
            .select('_id user_id comments file_name date_time');
        if (photos.length !== 0 && !!photos) {
            // Map over the photos array
            const mappedPhotos = photos.map(photo => {
                // Map over the comments array
                const mappedComments = photo.comments.map(comment => {
                    // Replace 'user_id' with 'user'
                    //create a new object with the same properties as the comment object
                    return {
                        ...comment._doc,
                        user: comment.user_id,
                        user_id: undefined
                    };
                });

                // Replace the 'comments' field with the mapped comments
                return {
                    ...photo._doc,
                    comments: mappedComments
                };
            });

            return mappedPhotos;

        }

    } catch (exception) {
        throw new Exception(exception.message);
    }

}


export default { getPhotosOfUser };