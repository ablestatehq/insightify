export const MODALS = {
  'comments': `query {
    comments(pagination: {start: 0, limit: 25}){
      data{
        id
        attributes{
          comment
          resourceId
          type
          publishedAt
          author{
            data{
              id
              attributes{
                username
                isAvailable
                firstName
                lastName
                createdAt
                photo{
                  data{
                    attributes{
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`,

  'me': `query{
    me{
      email,
      username,
      confirmed,
      gender,
    }
  }`,

  'notificationTokens': `query{
    notificationTokens(sort: "publishedAt:desc", pagination: {start: 0, limit: 25}){
      data{
        id,
        attributes{
          tokenID
        }
      }
    }
  }`,

  'techTips': `query($start: Int, $limit: Int){
    techTips(sort: "publishedAt:desc", pagination: { 
          start: $start, 
          limit: $limit 
        }){
      data{
        id
        attributes{
          title
          details
          source_url
          authors
          tags
          source_url_text
        }
      }
    }
  }`,

  'opportunities': `query($start: Int, $limit: Int) {
    opportunities(sort: "publishedAt:desc",
      pagination: {
            start: $start, 
            limit: $limit 
          }){
        data{
          id,
          attributes{
            Title,
            Category,
            Role,
            URL,
            Expires,
            Location,
            publishedAt,
            compensation, 
            Company,
            Description,
            company_logo{
              data{
                id,
                attributes{
                  url
                }
              }
            },
            cover_image{
              data{
                id,
                attributes{
                  url
                }
              }
            },
          }
        }
          meta {
            pagination {
              total
              page
              pageSize
              pageCount
            }
          }
      }
  }`,

  'sentNotifications': `query{
    sentNotifications(pagination: {start: 0, limit: 25}){

    }
  }`,
  'communityMembers':`query($start:Int, $limit: Int){
    communityMembers(pagination: {
            start: $start,
            limit: $limit}){
      data{
        id,
        attributes{
          email,
          country,
          phoneNumber,
          isWhatsAppPhone,
          primaryRole
        }
      }
      meta {
            pagination {
              total
              page
              pageSize
              pageCount
            }
          }
    }
  }`,
  'products':`query($start: Int, $limit: Int){
  products(pagination: {
          start: $start, 
          limit: $limit 
  }){
    data{
      id
      attributes{
        name
        tagline
        description
        createdAt
        status
        totalViews
        media{
          data{
            id
            attributes{
              url
            }
          }
        }
        tutorial{
          data{
            id
          }
        }
        uploadedBy{
          data{
            id
            attributes{
              firstName
              lastName
              primaryDomain
            }
          }
        }
        url
        meta
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
  }`,
'posts': `query($start: Int, $limit: Int) {
  posts(pagination: {
          start: $start, 
          limit: $limit 
        }) {
    data {
      id
      attributes {
        author{
         data{
          attributes{
            firstName
            lastName
            email
            photo{
              data {
                id
                attributes {
                  url
                }
          }
            }
          }
         }
        }
        content
        createdAt
        updatedAt
        topics {
          data {
            id
            attributes {
              name
              slug
              description
              usageCount
              isTrending
            }
          }
        }
        type
        views
        poll {
          data {
            id
            attributes {
              # options 
              endDate
              isMultipleChoice
              status
            }
          }
        }
        media {
          data {
            id
            attributes {
              url
            }
          }
        }
      }
    }
      meta {
          pagination {
            total
            page
            pageSize
            pageCount
          }
        }
  }
}
`
}