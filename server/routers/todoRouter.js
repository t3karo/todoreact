import { pool } from '../helpers/db.js'
import { Router} from 'express'
import { emptyOrRows } from '../helpers/utils.js'

const router = Router()

router.get('/',(req,res) => {
    pool.query('select * from task',(error,result)=>{
        if(error){
            return next(error)
        }
        return res.status(200).json(emptyOrRows(result))
    })
})

router.post('/create',(req,res) => {
    //const pool=openDb()

    pool.query('insert into task (description) values ($1) returning *',
    [req.body.description],
    (error,result)=>{
        if(error){
            return next(error)
        }
        return res.status(200).json({id: result.rows[0].id})
    })
})

router.delete('/delete/:id',(req,res) => {
    //const pool=openDb()
    const id = parseInt(req.params.id)

    pool.query('delete from task where id = $1',
    [id],
    (error,result)=>{
        if(error){
            return next(error)
        }
        return res.status(200).json({id: id})
    }
)
})

export default router;