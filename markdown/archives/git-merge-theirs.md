# 如何快速使用新分支覆盖老分支

来自[stackoverflow](https://stackoverflow.com/questions/10697463/resolve-git-merge-conflicts-in-favor-of-their-changes-during-a-pull/10697551)的问题: 
> How do I resolve a git merge conflict in favor of pulled changes?

> Basically I need to remove all conflicting changes from a working tree without having to go through all of the conflicts with a git mergetool while keeping all conflict-free changes. Preferably doing this while pulling, not afterwards.

如何在pull代码的时候就从A分支合并所有的代码并且解决冲突合并到B分支

`git pull -s recursive -X theirs origin develop_next`