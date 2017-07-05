var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    title: {type: String, required: '{PATH} is required!'},
    featured: {type: Boolean, required: '{PATH} is required!'},
    published: {type: Date, required: '{PATH} is required!'},
    tags: [String]
});

var Course = mongoose.model('Course', courseSchema);

function createDefaultCourses(){
    Course.find({}).exec(function(err, collection){
        if(collection.length === 0){
            Course.create({title: 'C for beginners', featured: true, published: new Date('10/15/2014')});
            Course.create({title: 'Java', featured: false, published: new Date('2/27/2015')});
            Course.create({title: 'Javascript', featured: true, published: new Date('9/6/2015')});
            Course.create({title: 'C#', featured: false, published: new Date('2/16/2014')});
            Course.create({title: 'C++', featured: true, published: new Date('3/8/2016')});
            Course.create({title: 'Linux  for beginners', featured: false, published: new Date('6/20/2013')});
            Course.create({title: 'Python', featured: true, published: new Date('9/10/2014')});
            Course.create({title: 'Operating System', featured: false, published: new Date('10/2/2014')});
            Course.create({title: 'Theory of Algorithm', featured: true, published: new Date('11/19/2015')});
            Course.create({title: 'Computer Architecture', featured: true, published: new Date('5/14/2013')});
            Course.create({title: 'Software Engineer', featured: false, published: new Date('7/23/2016')});
            Course.create({title: 'Senior Project', featured: true, published: new Date('5/14/2014')});
        }
    })
}

exports.createDefaultCourses = createDefaultCourses;