const router = require("express").Router();

const Students = require("./students-model.js");
const { validateStudentId } = require("./students-helper");

router.get("/", checkRole("admin"), (req, res) => {
  Students.find()
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => res.send(err));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Students.findById(id)
    .then(students => {
      res.status(201).json(students);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "No student found at this ID." });
    });
});

router.get("/:id/messages", (req, res) => {
    const { id } = req.params;
    Users.findMessages(id)
      .then(messages => {
        if (messages) {
          res.status(200).json(messages);
        } else {
          res
            .status(400)
            .json({ errorMessage: "Could not find this student's messages" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "Failed to get messages." });
      });
  });

router.get("/:id/tasks", (req,res) => {
  const { id } = req.params;
  Students.findTasks(id)
  .then(tasks => {
    if (tasks) {
      res.status(200).json(tasks);
    } else {
      res.status(400).json({ message: "Student does not currently have tasks"})
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: "Could not retrieve student tasks"})
  })
});

router.post("/", (req, res) => {
  const students = { ...req.body };
  Students.add(students)
    .then(student => {
      if (!student.professor_id) {
        res.status(400).json({error:"Must add a professor id"});
      } else {
        res.status(201).json(student);
      }  
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Could not add a student." });
    });
});

router.put("/:id", validateStudentId, (req, res) => {
  const body = { ...req.body };
  const { id } = req.params;

  Students.update(id, body)
    .then(changed => {
      res.status(201).json(changed);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not update students at this ID" });
    });
});

router.delete("/:id", validateStudentId, (req, res) => {
  const id = req.params.id;
  Students.remove(id)
    .then(students => {
      res.json(`Student ${students} has been deleted`);
    })
    .catch(err => {
      res.status(500).json({ message: "The student could not be removed" });
    });
});

function checkRole(role) {
  return (req, res, next) => {
    if (req.decodedToken && req.decodedToken.role === role) {
      next();
    } else {
      res.status(403).json({
        error:
          "Admin access only. You do not have permission to view this page."
      });
    }
  };
}

module.exports = router;
