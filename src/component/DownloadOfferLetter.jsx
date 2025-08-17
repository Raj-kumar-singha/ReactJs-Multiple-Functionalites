import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const DownloadOfferLetter = () => {
    const [formData, setFormData] = useState({
        employeeName: '',
        positionTitle: '',
        department: '',
        companyName: '',
        joiningDate: '',
        salary: ''
    })
    const [isGenerating, setIsGenerating] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve(img)
            img.onerror = reject
            img.src = src
        })
    }

    const generatePDF = async () => {
        setIsGenerating(true)

        try {
            const { jsPDF } = await import('jspdf')
            const pdf = new jsPDF('p', 'mm', 'a4')

            const pageWidth = 210
            const pageHeight = 297

            try {
                const templateImage = await loadImage('/offerletter-acme.png')
                pdf.addImage(templateImage, 'PNG', 0, 0, pageWidth, pageHeight)
            } catch (error) {
                console.warn('Could not load template image, proceeding without background')
            }

            pdf.setTextColor(0, 0, 0)
            pdf.setFont('helvetica', 'bold')

            pdf.setFontSize(12)
            pdf.text(new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }), 24, 80)

            pdf.setFontSize(11)
            pdf.text(`${formData.positionTitle}.`, 113, 90)

            pdf.setFontSize(12)
            pdf.text(`${formData.employeeName},`, 35, 100)

            pdf.text(`${formData.positionTitle},`, 120, 110)

            pdf.text(`${formData.companyName}.`, 30, 115)

            pdf.text(`${formData.positionTitle},`, 50, 131)

            pdf.text(`${formData.joiningDate},`, 50, 136)

            pdf.text(`${formData.salary}.`, 94, 151)

            pdf.text(formData.companyName, 95, 193)

            pdf.text(formData.employeeName, 30, 218)

            pdf.text(`${formData.companyName}.`, 25, 230)

            pdf.text(new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
            }), 145, 266)

            const sanitizedName = formData.employeeName.trim().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_')
            const dateStr = new Date().toISOString().split('T')[0]
            const filename = `${sanitizedName}_Offer_Letter_${dateStr}.pdf`

            pdf.save(filename)

            alert('Offer letter PDF generated and downloaded successfully!')

        } catch (error) {
            console.error('PDF generation failed:', error)
            alert('Failed to generate PDF. Please try again.')
        } finally {
            setIsGenerating(false)
        }
    }

    const handleDownload = async () => {
        const requiredFields = ['employeeName', 'positionTitle', 'department', 'companyName', 'joiningDate', 'salary']
        const missingFields = requiredFields.filter(field => !formData[field].trim())

        if (missingFields.length > 0) {
            alert('Please fill in all required fields before generating the offer letter')
            return
        }

        await generatePDF()
    }

    const resetForm = () => {
        setFormData({
            employeeName: '',
            positionTitle: '',
            department: '',
            companyName: '',
            joiningDate: '',
            salary: ''
        })
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Generate Offer Letter</h1>
                    <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                        Back to Home
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name *</label>
                            <input
                                type="text"
                                name="employeeName"
                                value={formData.employeeName}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter employee name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Position Title *</label>
                            <input
                                type="text"
                                name="positionTitle"
                                value={formData.positionTitle}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., Software Engineer"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                            <input
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., Engineering"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter company name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Joining Date *</label>
                            <input
                                type="date"
                                name="joiningDate"
                                value={formData.joiningDate}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Salary *</label>
                            <input
                                type="text"
                                name="salary"
                                value={formData.salary}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., $50,000 per annum"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center space-x-4 mt-8">
                        <button
                            onClick={handleDownload}
                            disabled={isGenerating}
                            className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                        >
                            {isGenerating ? 'Generating PDF...' : 'Generate & Download PDF'}
                        </button>

                        <button
                            onClick={resetForm}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                        >
                            Reset Form
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DownloadOfferLetter