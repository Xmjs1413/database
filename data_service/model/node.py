# _*_ coding: utf8 _*_
class Node:

    def __init__(self, id, title, status, content, node_type):
        self.id = id
        self.title = title
        self.status = status
        self.content = content
        self.node_type = node_type
        self.child_nodes = []
        self.parent_nodes = []
        self.level = -1

    def __dict__(self):
        return { "id": self.id, "title": self.title, "level": self.level,
          "type": self.node_type, "status": self.status, "content": self.content
        }
    def __str__(self):
        return str({ "id": self.id, "title": self.title, "level": self.level,
             "type": self.node_type, "status": self.status, "content": self.content
             })

    def __hash__(self):
        return hash(self.id)

    def __eq__(self, other):
        if isinstance(other, self.__class__):
            return self.id == other.id
        else:
            return False

    def is_child_of(self, parent_node):
        for n in self.parent_nodes:
            if parent_node.id == n.id:
                return True
            if n.is_child_of(parent_node):
                return True
        return False

