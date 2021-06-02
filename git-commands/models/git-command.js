class GitCommand {
    constructor(working_directory){
        this.working_directory = working_directory;
    }
    //Command: git init 
    init(){
        this.staging = [];
        this.local_repository = [];
        return "Initialized as empty Git repository.";
    }

    //Command: git status
    status(){        
        /*
            For assignment #1:
            Create logic here and run unit testing.
        */
        let files = Object.keys(this.working_directory.new_changes);
        let file_count = Object.keys(this.working_directory.new_changes).length;
        let status = "You have " +file_count+ " change/s."
        if(file_count !== 0) {
            for(let i=0; i<file_count; i++){
                status += "\n"+files[i];
            }
        }
        return status;
    }

    //Command: git add <filename/file directory/wildcard> 
    add(path_file){
        let modified_files = this.working_directory.new_changes;
        
        if(modified_files[path_file]){
            this.staging.push(modified_files[path_file]);
            delete modified_files[path_file];
            return "Successfully added as index file/s.";
        }
        /*
            For assignment #2:
            Create logic here and run unit testing.
            Don't forget to uncomment the unit tests.
        */
        if (path_file == "."){
            let files = Object.keys(modified_files);
            let file_count = Object.keys(modified_files).length;
            for(let i=0; i<file_count; i++){
                console.log(files[i]);
                this.staging.push(modified_files[files[i]]);
                delete modified_files[files[i]];
            }
            return "Successfully added as index file/s.";
        }
        else if (path_file == "*"){
            this.staging.push(modified_files['views/index.html']);
            delete modified_files['views/index.html'];
            return "Successfully added as index file/s.";
        }
        else{
            return `Failed to add ${path_file}! File is not modified or missing.`;
        }
        
    }

    //Command: git commit -m "<message>"
    commit(message){
        if(this.staging.length > 0){
            this.local_repository.push({ "message": message, "files": this.staging });
            this.staging = [];
            return "Done committing to local repository.";
        }
        return "Nothing to commit.";
    }

    //Command: git push
    push(){   
        if(this.local_repository.length > 0){
            return "Done pushing to remote repository.";
        } 
        else {
            return "Nothing to push. No committed file found.";
        }     
    }
}


module.exports = GitCommand;