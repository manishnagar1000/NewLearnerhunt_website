import React, { useEffect, useState } from 'react'
import Classes from '/styles/collegeranking.module.css'
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Skeleton,
    Typography
} from "@mui/material";
import Link from 'next/link';
const CollegeRanking = ({ zones, departments, rankingtypes }) => {
    const [selectedDiscipline, setSelectedDiscipline] = useState(departments[0].label)
    const [selectedZone, setSelectedZone] = useState(zones[0].name)
    const [selectedChip, setSelectedChip] = useState(rankingtypes[0].label)
    const [collegeData, setCollegeData] = useState([])
    const [isApihitComplete, setIsApiHitComplete] = useState(true)
    // console.log(zones, departments, rankingtypes)

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/colleges/ranking?type=${selectedChip}&zone=${selectedZone}&department=${selectedDiscipline}`)
            const response = await data.json()
            return response.data
        }
        try {
            setIsApiHitComplete(false)
            setCollegeData([])
            fetchData().then(resp => {
                // console.log(resp)
                const data = resp.sort((a, b) => Number(a.college_rank_no) - Number(b.college_rank_no))
                if (data && data.length > 0) {
                    setCollegeData(data)
                }
                setIsApiHitComplete(true)
            })

        } catch (e) {
            console.error(e)
        }
    }, [selectedChip, selectedDiscipline, selectedZone])

    return (
        <div className={Classes['college-ranking']}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2>College Ranking</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className={Classes['chip-stack']}>
                            {
                                rankingtypes.map((r,i) => {
                                    return (
                                        <span key={i} onClick={() => setSelectedChip(r.label)} className={`${Classes['chip']} ${selectedChip == r.label ? Classes['active'] : ""}`}>{r.label}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={`col-md-3`}>
                        <FormControl
                            required
                            size="small"
                            className="rounded-lg"
                            fullWidth
                            margin="normal"
                        >
                            <InputLabel>Discipline</InputLabel>
                            <Select
                                value={selectedDiscipline}
                                label="Discipline"
                                onChange={(e) =>
                                    setSelectedDiscipline(e.target.value)
                                }
                            >
                                <MenuItem value="" disabled>
                                    <em>Select</em>
                                </MenuItem>
                                {departments.map((d, i) => {
                                    return (
                                        <MenuItem key={i} value={d.value}>
                                            {d.label}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <div className={`col-md-3`}>
                        <FormControl
                            required
                            size="small"
                            className="rounded-lg"
                            fullWidth
                            margin="normal"
                        >
                            <InputLabel>Zone</InputLabel>
                            <Select
                                value={selectedZone}
                                label="zone"
                                onChange={(e) =>
                                    setSelectedZone(e.target.value)
                                }
                            >
                                <MenuItem value="" disabled>
                                    <em>Select</em>
                                </MenuItem>
                                {zones.map((zone, i) => {
                                    return (
                                        <MenuItem key={i} value={zone.name}>
                                            {zone.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                {
                    isApihitComplete ?
                        <div className="row mt-3">
                            <div className="col-12">
                                <table className='table table-striped table-responsive'>
                                    <thead>
                                        <tr>
                                            <th>College Name</th>
                                            <th>Rank</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            collegeData?.map((clg,i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td className={Classes['clg-name']}><Link href={`/collegs/${clg.slug}`}>{clg.name}</Link></td>
                                                        <td>#{clg.college_rank_no}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        :
                        <Typography variant="h1">{<Skeleton animation="wave" />}</Typography>
                }
            </div>
        </div>
    )
}

export default CollegeRanking