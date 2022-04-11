const router = require("express").Router();
const multer = require("multer");
const controller = require("../../controller/appointments/appointments.controller.js")

let doctorStorage = multer.diskStorage({
    destination : function (req,file,callBack){
        callBack(null,`../client/public/pdfs/`);
    },
    filename : function(req,file,callBack)
    { 
        callBack(null,file.originalname)
    }
})

let uploadPdf = multer({
    storage : doctorStorage
})

router.post("/appointment/:hospitalId", uploadPdf.single("file") , controller.bookAppointment);
router.get("/get/appointment/history/:userEmail", controller.getAppointmentsHistory);
router.get("/show/appointments/:hospitalId", controller.showAppointments)
router.get("/confirm/appointment/:userEmail", controller.confirmAppointment)

module.exports = router;